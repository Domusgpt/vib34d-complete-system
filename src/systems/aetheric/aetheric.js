// AETHERIC System (screen-space interference + polychora shadows)
// Drop-in module for vib34d-ultimate-viewer
// Exports a factory with { id, name, init(gl), draw(gl, state, dt), resize(gl), dispose(gl) }

import { compileProgram } from '../../_shared/glutils.js';

const vertSrc = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

// VIB34D grammar (mapped from shared UI/controller)
uniform float u_rotXW;
uniform float u_rotYW;
uniform float u_rotZW;
uniform float u_grid;      // "Grid Density"      [~1..64]
uniform float u_morph;     // "Morph Factor"      [0..1+]
uniform float u_chaos;     // "Chaos"             [0..1]
uniform float u_speed;     // "Speed"             [0.1..3]
uniform float u_hue;       // "Hue"               [0..360]
uniform float u_intensity; // "Intensity"         [0..1.5]
uniform float u_sat;       // "Saturation"        [0..1]
uniform float u_scale;     // "Scale"             [0.25..2]

// ===== Helpers =====
const float PI = 3.14159265359;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 234.12));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

vec3 hsl2rgb(float h, float s, float l){
  float c = (1.0 - abs(2.0*l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h/60.0, 2.0) - 1.0));
  float m = l - 0.5*c;
  vec3 rgb =
    (h < 60.0)  ? vec3(c,x,0) :
    (h < 120.0) ? vec3(x,c,0) :
    (h < 180.0) ? vec3(0,c,x) :
    (h < 240.0) ? vec3(0,x,c) :
    (h < 300.0) ? vec3(x,0,c) :
                  vec3(c,0,x);
  return rgb + m;
}

// 4D rotator: project X/Y/Z under XW,YW,ZW rotations into 3D intensity
mat3 basisFrom4DRot(float rxw, float ryw, float rzw) {
  float cx = cos(rxw), sx = sin(rxw);
  float cy = cos(ryw), sy = sin(ryw);
  float cz = cos(rzw), sz = sin(rzw);

  // we collapse W using three independent rotations into a 3x3 mixing basis
  return mat3(
    cx,  -sx*cz,  sx*sz,
    sy,   cy*cz, -cy*sz,
    sz,   cz,     1.0
  );
}

// Signed distance to simple polychora shadow lattice (screen-space param)
float sdfShadow(vec2 p, mat3 B) {
  // Tri-planar grid interference "shadow" of higher-D structure
  float g = u_grid;
  vec3 q = B * vec3(p*u_scale, 1.0);
  vec2 w1 = vec2(sin(q.x*g), cos(q.y*g));
  vec2 w2 = vec2(sin(q.y*g*1.732), cos(q.z*g*1.618));
  float field = dot(w1,w1) + dot(w2,w2);
  return field; // not a true SDF, but behaves like a soft density
}

// Multi-octave interference (caustic feel)
float aether(vec2 p, float t) {
  float f = 0.0;
  float a = 0.6 + 0.4*u_morph;
  float freq = 1.0;
  for (int i=0; i<5; ++i) {
    vec2 q = p*freq;
    float phase = t*u_speed*(0.6 + 0.4*float(i));
    float s = sin(q.x+phase) * cos(q.y - 0.5*phase);
    float n = s * (0.8 + 0.2*hash21(q));
    f += n * a;
    a *= 0.6;
    freq *= 1.9 + 0.3*u_chaos;
  }
  return f;
}

void main(){
  vec2 uv = (gl_FragCoord.xy / u_res.xy);
  vec2 p = (uv - 0.5) * vec2(u_res.x/u_res.y, 1.0);

  mat3 B = basisFrom4DRot(u_rotXW, u_rotYW, u_rotZW);

  float shadow = sdfShadow(p, B);
  float wave   = aether(p, u_time);

  // combine: bright seams where density + interference align
  float lum = pow(max(0.0, shadow * 0.35 + wave), 1.2) * u_intensity;

  // subtle chroma shift from 4D "parallax" derivative
  float par = length(B * vec3(p,1.0));
  float hue = mod(u_hue + 90.0*par + 30.0*u_morph, 360.0);

  vec3 col = hsl2rgb(hue, clamp(u_sat, 0.0, 1.0), clamp(0.45 + 0.25*lum, 0.0, 1.0));

  // card-glass pop (soft vignette + rim specular)
  float r = length(uv - 0.5);
  float vign = smoothstep(0.85, 0.35, r);
  float rim  = smoothstep(0.48, 0.5, r) * 0.25;

  col *= vign;
  col += rim * vec3(1.0);

  fragColor = vec4(col, 1.0);
}`;

export default function createAethericSystem() {
  let program, vao, uniforms = {}, quad;

  const id = 'AETHERIC';
  const name = 'Aetheric (Holo-Caustics)';

  function init(gl) {
    program = compileProgram(gl, vertSrc, fragSrc);

    // Fullscreen triangle (fewer verts than quad; consistent with other systems' full-screen pass)
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1,-1,  3,-1,  -1,3]),
      gl.STATIC_DRAW
    );

    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uni = n => gl.getUniformLocation(program, n);
    uniforms = {
      u_time:      uni('u_time'),
      u_res:       uni('u_res'),
      u_rotXW:     uni('u_rotXW'),
      u_rotYW:     uni('u_rotYW'),
      u_rotZW:     uni('u_rotZW'),
      u_grid:      uni('u_grid'),
      u_morph:     uni('u_morph'),
      u_chaos:     uni('u_chaos'),
      u_speed:     uni('u_speed'),
      u_hue:       uni('u_hue'),
      u_intensity: uni('u_intensity'),
      u_sat:       uni('u_sat'),
      u_scale:     uni('u_scale')
    };

    quad = { vbo };
  }

  function resize(gl, w, h) {
    gl.viewport(0, 0, w, h);
  }

  function draw(gl, state, dt) {
    const { width, height } = gl.canvas;
    const p = state.params;

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.uniform1f(uniforms.u_time, state.time);
    gl.uniform2f(uniforms.u_res, width, height);

    gl.uniform1f(uniforms.u_rotXW, p.rotXW || 0.0);
    gl.uniform1f(uniforms.u_rotYW, p.rotYW || 0.0);
    gl.uniform1f(uniforms.u_rotZW, p.rotZW || 0.0);

    gl.uniform1f(uniforms.u_grid,  (p.gridDensity ?? 15.0));
    gl.uniform1f(uniforms.u_morph, (p.morphFactor ?? 1.0));
    gl.uniform1f(uniforms.u_chaos, (p.chaos ?? 0.2));
    gl.uniform1f(uniforms.u_speed, (p.speed ?? 1.0));

    gl.uniform1f(uniforms.u_hue,       (p.hue ?? 200.0));
    gl.uniform1f(uniforms.u_intensity, (p.intensity ?? 0.9));
    gl.uniform1f(uniforms.u_sat,       (p.saturation ?? 0.5));

    gl.uniform1f(uniforms.u_scale, (p.scale ?? 1.0));

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function dispose(gl) {
    if (vao) gl.deleteVertexArray(vao);
    if (quad?.vbo) gl.deleteBuffer(quad.vbo);
    if (program) gl.deleteProgram(program);
  }

  return { id, name, init, draw, resize, dispose };
}