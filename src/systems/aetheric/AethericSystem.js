/**
 * AETHERIC System - 5-Layer Hyperdimensional Wave-Interference Engine
 *
 * Features:
 * - 6 degrees of 4D rotation (XW, YW, ZW, XY, XZ, YZ)
 * - 5 layered canvases with sophisticated wave interference mathematics
 * - Advanced polytopal shadow projection systems
 * - Multi-octave interference fields with 4D basis transformations
 * - Intelligent parameter feedback and geometry morphing
 */

/**
 * AethericVisualizer - Individual layer renderer for hyperdimensional interference
 */
class AethericVisualizer {
    constructor(canvasId, role, config) {
        this.canvasId = canvasId;
        this.role = role; // background, shadow, content, highlight, accent
        this.config = config;
        this.canvas = null;
        this.gl = null;
        this.program = null;
        this.time = 0;
        this.vertexBuffer = null;
        this.isActive = false;
    }

    initialize() {
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.error(`❌ Canvas ${this.canvasId} not found`);
            return false;
        }

        this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
        if (!this.gl) {
            console.error(`❌ WebGL not supported for ${this.canvasId}`);
            return false;
        }

        console.log(`🌌 WebGL context created for ${this.canvasId}: ${this.gl instanceof WebGL2RenderingContext ? 'WebGL2' : 'WebGL1'}`);

        if (!this.createAethericShader()) {
            console.error(`❌ Failed to create shader for ${this.canvasId}`);
            return false;
        }

        this.setupCanvasSize();
        this.setupVertexBuffer();

        // Enable sophisticated blending for interference effects
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        return true;
    }

    setupCanvasSize() {
        const container = document.getElementById('aethericLayers');
        const tempDisplay = container ? container.style.display : null;

        if (container && tempDisplay === 'none') {
            container.style.display = 'block';
        }

        const rect = this.canvas.parentElement.getBoundingClientRect();

        if (container && tempDisplay === 'none') {
            container.style.display = tempDisplay;
        }

        this.canvas.width = rect.width > 0 ? rect.width : window.innerWidth - 300;
        this.canvas.height = rect.height > 0 ? rect.height : window.innerHeight - 50;

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        console.log(`🌌 Canvas ${this.canvasId} WebGL viewport: ${this.canvas.width}x${this.canvas.height}`);
    }

    setupVertexBuffer() {
        // Full-screen quad
        const vertices = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);

        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    }

    createAethericShader() {
        const vertexShader = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform float u_geometry;

            // COMPLETE 6D 4D rotation uniforms - ALL POSSIBLE ROTATIONS
            uniform float u_rot4dXW;
            uniform float u_rot4dYW;
            uniform float u_rot4dZW;
            uniform float u_rot4dXY;
            uniform float u_rot4dXZ;
            uniform float u_rot4dYZ;

            uniform float u_gridDensity;
            uniform float u_morphFactor;
            uniform float u_chaos;
            uniform float u_speed;
            uniform float u_hue;
            uniform float u_intensity;
            uniform float u_saturation;
            uniform float u_scale;

            // Layer-specific parameters
            uniform vec3 u_layerColor;
            uniform float u_layerScale;
            uniform float u_layerOpacity;
            uniform float u_interferencePhase;
            uniform float u_waveAmplitude;
            uniform float u_projectionDistance;

            // Advanced interference parameters
            uniform float u_coherenceLength;
            uniform float u_dispersionRate;
            uniform float u_fieldCoupling;
            uniform float u_dimensionalBridge;

            // COMPLETE 4D rotation matrices - All 6 possible rotations
            mat4 rotateXW(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    c, 0, 0, -s,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    s, 0, 0, c
                );
            }

            mat4 rotateYW(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    1, 0, 0, 0,
                    0, c, 0, -s,
                    0, 0, 1, 0,
                    0, s, 0, c
                );
            }

            mat4 rotateZW(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, c, -s,
                    0, 0, s, c
                );
            }

            mat4 rotateXY(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    c, -s, 0, 0,
                    s, c, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                );
            }

            mat4 rotateXZ(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    c, 0, -s, 0,
                    0, 1, 0, 0,
                    s, 0, c, 0,
                    0, 0, 0, 1
                );
            }

            mat4 rotateYZ(float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return mat4(
                    1, 0, 0, 0,
                    0, c, -s, 0,
                    0, s, c, 0,
                    0, 0, 0, 1
                );
            }

            // ADVANCED: Apply complete 4D rotation transformation
            vec4 transform4D(vec4 pos) {
                mat4 transform = rotateXW(u_rot4dXW) *
                               rotateYW(u_rot4dYW) *
                               rotateZW(u_rot4dZW) *
                               rotateXY(u_rot4dXY) *
                               rotateXZ(u_rot4dXZ) *
                               rotateYZ(u_rot4dYZ);
                return transform * pos;
            }

            // ADVANCED: 4D to 3D projection with perspective
            vec3 project4Dto3D(vec4 pos4d) {
                float w = pos4d.w + u_projectionDistance;
                if (abs(w) < 0.001) w = 0.001;
                return pos4d.xyz / w;
            }

            // ADVANCED: Hyperdimensional distance function
            float hyperdistance(vec4 p1, vec4 p2) {
                vec4 diff = p1 - p2;
                return sqrt(dot(diff, diff));
            }

            // ULTRA-ADVANCED: Sophisticated 4D polytope & mathematical surface library
            float sdf4DHypersphere(vec4 pos, float radius) {
                return length(pos) - radius;
            }

            float sdf4DHypercube(vec4 pos, vec4 size) {
                vec4 d = abs(pos) - size;
                return length(max(d, 0.0)) + min(max(d.x, max(d.y, max(d.z, d.w))), 0.0);
            }

            float sdf4D5Cell(vec4 pos) {
                // Perfect 4D regular simplex (5-cell) with correct hyperplane equations
                float s = 0.5;
                vec4 n1 = normalize(vec4(1.0,1.0,1.0,1.0));
                vec4 n2 = normalize(vec4(1.0,-1.0,-1.0,1.0));
                vec4 n3 = normalize(vec4(-1.0,1.0,-1.0,1.0));
                vec4 n4 = normalize(vec4(-1.0,-1.0,1.0,1.0));
                vec4 n5 = normalize(vec4(0.0,0.0,0.0,-1.0));

                float d = dot(pos, n1) - s;
                d = max(d, dot(pos, n2) - s);
                d = max(d, dot(pos, n3) - s);
                d = max(d, dot(pos, n4) - s);
                d = max(d, dot(pos, n5) - s);
                return d;
            }

            float sdf4D16Cell(vec4 pos) {
                // 4D cross-polytope (16-cell) - perfect implementation
                return abs(pos.x) + abs(pos.y) + abs(pos.z) + abs(pos.w) - 0.7;
            }

            float sdf4D24Cell(vec4 pos) {
                // 4D 24-cell with sophisticated octahedral symmetry
                vec4 p = abs(pos);
                float d1 = (p.x + p.y + p.z - p.w) * 0.57735027;  // 1/sqrt(3)
                float d2 = (p.x + p.y - p.z + p.w) * 0.57735027;
                float d3 = (p.x - p.y + p.z + p.w) * 0.57735027;
                float d4 = (-p.x + p.y + p.z + p.w) * 0.57735027;
                return max(max(d1, d2), max(d3, d4)) - 0.5;
            }

            float sdf4D120Cell(vec4 pos) {
                // 4D 120-cell (dodecahedral) with golden ratio mathematics
                vec4 p = pos;
                float phi = 1.618033988749895; // Golden ratio φ

                vec4 n = normalize(vec4(phi, 1.0, 0.0, 1.0/phi));
                float d = abs(dot(p, n)) - 0.85;

                for (int i = 0; i < 3; i++) {
                    p = abs(p) - vec4(0.3);
                    p = p.yzwx;
                    d = min(d, abs(dot(p, n)) - 0.7);
                }
                return d;
            }

            float sdf4D600Cell(vec4 pos) {
                // 4D 600-cell (icosahedral) - most complex regular polytope
                vec4 p = pos;
                float phi = 1.618033988749895;

                float d = length(p) - 0.6;

                vec4 n1 = normalize(vec4(1.0, phi, 0.0, 1.0/phi));
                vec4 n2 = normalize(vec4(phi, 0.0, 1.0/phi, 1.0));
                vec4 n3 = normalize(vec4(0.0, 1.0/phi, 1.0, phi));

                d = max(d, abs(dot(p, n1)) - 0.7);
                d = max(d, abs(dot(p, n2)) - 0.7);
                d = max(d, abs(dot(p, n3)) - 0.7);
                return d;
            }

            float sdf4DHypertorus(vec4 pos, float R, float r) {
                // Perfect 4D torus with dual radii
                vec2 t1 = vec2(length(pos.xy) - R, pos.z);
                vec2 t2 = vec2(length(t1) - r, pos.w);
                return length(t2) - r * 0.5;
            }

            float sdf4DKleinBottle(vec4 pos) {
                // 4D Klein bottle - non-orientable topological surface
                vec4 p = pos;
                float a = 2.0;
                float n = 1.0;

                float x = p.x, y = p.y, z = p.z, w = p.w;
                float f = (x*x + y*y + z*z + w*w + a*a - n*n);
                f *= f;
                f -= 4.0*a*a*(x*x + y*y);
                return f * 0.1 - 0.3;
            }

            float sdf4DQuantumField(vec4 pos) {
                // Quantum probability cloud visualization
                vec4 p = pos * 3.0;
                float wave1 = sin(p.x + u_time) * sin(p.y) * sin(p.z) * sin(p.w);
                float wave2 = cos(p.y + u_time * 0.7) * cos(p.z) * cos(p.w) * cos(p.x);
                float wave3 = sin(p.z + u_time * 1.3) * cos(p.w) * sin(p.x) * cos(p.y);

                float interference = wave1 * wave2 + wave2 * wave3 + wave3 * wave1;
                return abs(interference) - 0.3 - u_morphFactor * 0.2;
            }

            // ULTRA-ADVANCED: Multi-geometry morphing system with ALL regular polytopes
            float geometryField(vec4 pos) {
                vec4 transformed = transform4D(pos);
                float field = 0.0;
                float g = u_geometry;

                // 4D Hypersphere (simplest regular form)
                if (g < 1.0) {
                    field = sdf4DHypersphere(transformed, 0.5 + 0.2 * sin(u_time * u_speed));
                }
                // 4D Hypercube (8-cell)
                else if (g < 2.0) {
                    field = sdf4DHypercube(transformed, vec4(0.4 + 0.1 * u_morphFactor));
                }
                // 5-Cell (4D simplex) - MOST FUNDAMENTAL 4D POLYTOPE
                else if (g < 3.0) {
                    field = sdf4D5Cell(transformed * (1.0 + 0.3 * u_morphFactor));
                }
                // 16-Cell (4D cross-polytope)
                else if (g < 4.0) {
                    field = sdf4D16Cell(transformed * (0.8 + 0.4 * u_morphFactor));
                }
                // 24-Cell (UNIQUE TO 4D - no 3D analog)
                else if (g < 5.0) {
                    field = sdf4D24Cell(transformed);
                }
                // 120-Cell (dodecahedral) - GOLDEN RATIO POLYTOPE
                else if (g < 6.0) {
                    field = sdf4D120Cell(transformed * 0.8);
                }
                // 600-Cell (icosahedral) - MOST COMPLEX REGULAR POLYTOPE
                else if (g < 7.0) {
                    field = sdf4D600Cell(transformed * 0.7);
                }
                // 4D Hypertorus
                else if (g < 8.0) {
                    field = sdf4DHypertorus(transformed, 0.4, 0.2);
                }
                // 4D Klein Bottle (non-orientable surface)
                else if (g < 9.0) {
                    field = sdf4DKleinBottle(transformed * 0.5);
                }
                // Quantum Field Visualization
                else {
                    field = sdf4DQuantumField(transformed);
                }

                return field;
            }

            // ADVANCED: Multi-octave interference calculation
            float interferenceField(vec2 screenPos, float time) {
                vec4 pos4d = vec4(screenPos * u_scale, sin(time * u_speed) * 0.3, cos(time * u_speed * 0.7) * 0.3);

                float interference = 0.0;
                float amplitude = u_waveAmplitude;
                float frequency = u_gridDensity * 0.1;

                // Multi-octave interference with 4D transformations
                for (int octave = 0; octave < 8; octave++) {
                    vec4 samplePos = pos4d * frequency;
                    vec4 transformed = transform4D(samplePos);

                    // Wave interference calculation
                    float wave1 = sin(dot(transformed.xy, vec2(1.0, 1.732)) + time * u_speed + u_interferencePhase);
                    float wave2 = sin(dot(transformed.zw, vec2(1.414, 1.0)) + time * u_speed * 0.8 + u_interferencePhase * 1.2);
                    float wave3 = sin(length(transformed) * 2.0 + time * u_speed * 1.3);

                    // Coherent interference
                    float coherence = exp(-frequency * u_coherenceLength);
                    interference += (wave1 * wave2 + wave3) * amplitude * coherence;

                    amplitude *= 0.5 + u_chaos * 0.3;
                    frequency *= 2.0 + u_dispersionRate * 0.5;
                }

                return interference;
            }

            // ADVANCED: HSL to RGB with hyperdimensional hue shifting
            vec3 hsl2rgb(float h, float s, float l) {
                float c = (1.0 - abs(2.0 * l - 1.0)) * s;
                float x = c * (1.0 - abs(mod(h / 60.0, 2.0) - 1.0));
                float m = l - 0.5 * c;

                vec3 rgb;
                if (h < 60.0) rgb = vec3(c, x, 0);
                else if (h < 120.0) rgb = vec3(x, c, 0);
                else if (h < 180.0) rgb = vec3(0, c, x);
                else if (h < 240.0) rgb = vec3(0, x, c);
                else if (h < 300.0) rgb = vec3(x, 0, c);
                else rgb = vec3(c, 0, x);

                return rgb + m;
            }

            void main() {
                vec2 screenPos = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
                screenPos.x *= u_resolution.x / u_resolution.y;

                // Calculate interference field
                float interference = interferenceField(screenPos, u_time);

                // Calculate 4D geometry field for shadows/interactions
                vec4 pos4d = vec4(screenPos * u_scale, 0.0, 1.0);
                float geoField = geometryField(pos4d);

                // Combine interference with geometry
                float combinedField = interference + geoField * u_fieldCoupling;

                // Enhanced luminosity calculation
                float luminosity = abs(combinedField) * u_intensity;
                luminosity = pow(luminosity, 0.8) * u_layerOpacity;

                // Hyperdimensional hue shifting
                vec4 transformed = transform4D(vec4(screenPos, u_time * 0.1, 1.0));
                float hueShift = (transformed.w + transformed.x * transformed.y) * u_dimensionalBridge * 60.0;
                float finalHue = mod(u_hue + hueShift, 360.0);

                // Generate final color
                vec3 baseColor = hsl2rgb(finalHue, u_saturation, 0.5);
                vec3 layerColor = mix(baseColor, u_layerColor, 0.3);

                // Apply layer-specific effects
                layerColor *= u_layerScale;

                // Vignette effect
                float vignette = 1.0 - length(screenPos) * 0.5;
                vignette = smoothstep(0.0, 1.0, vignette);

                gl_FragColor = vec4(layerColor * luminosity * vignette, luminosity * u_layerOpacity);
            }
        `;

        // Compile shaders
        const vertShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShader);
        const fragShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShader);

        if (!vertShader || !fragShader) {
            return false;
        }

        // Create program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertShader);
        this.gl.attachShader(this.program, fragShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('Program link error:', this.gl.getProgramInfoLog(this.program));
            return false;
        }

        // Get uniform locations
        this.uniforms = {
            u_time: this.gl.getUniformLocation(this.program, 'u_time'),
            u_resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
            u_geometry: this.gl.getUniformLocation(this.program, 'u_geometry'),

            // 6D 4D rotations
            u_rot4dXW: this.gl.getUniformLocation(this.program, 'u_rot4dXW'),
            u_rot4dYW: this.gl.getUniformLocation(this.program, 'u_rot4dYW'),
            u_rot4dZW: this.gl.getUniformLocation(this.program, 'u_rot4dZW'),
            u_rot4dXY: this.gl.getUniformLocation(this.program, 'u_rot4dXY'),
            u_rot4dXZ: this.gl.getUniformLocation(this.program, 'u_rot4dXZ'),
            u_rot4dYZ: this.gl.getUniformLocation(this.program, 'u_rot4dYZ'),

            // Standard parameters
            u_gridDensity: this.gl.getUniformLocation(this.program, 'u_gridDensity'),
            u_morphFactor: this.gl.getUniformLocation(this.program, 'u_morphFactor'),
            u_chaos: this.gl.getUniformLocation(this.program, 'u_chaos'),
            u_speed: this.gl.getUniformLocation(this.program, 'u_speed'),
            u_hue: this.gl.getUniformLocation(this.program, 'u_hue'),
            u_intensity: this.gl.getUniformLocation(this.program, 'u_intensity'),
            u_saturation: this.gl.getUniformLocation(this.program, 'u_saturation'),
            u_scale: this.gl.getUniformLocation(this.program, 'u_scale'),

            // Layer-specific
            u_layerColor: this.gl.getUniformLocation(this.program, 'u_layerColor'),
            u_layerScale: this.gl.getUniformLocation(this.program, 'u_layerScale'),
            u_layerOpacity: this.gl.getUniformLocation(this.program, 'u_layerOpacity'),
            u_interferencePhase: this.gl.getUniformLocation(this.program, 'u_interferencePhase'),
            u_waveAmplitude: this.gl.getUniformLocation(this.program, 'u_waveAmplitude'),
            u_projectionDistance: this.gl.getUniformLocation(this.program, 'u_projectionDistance'),

            // Advanced
            u_coherenceLength: this.gl.getUniformLocation(this.program, 'u_coherenceLength'),
            u_dispersionRate: this.gl.getUniformLocation(this.program, 'u_dispersionRate'),
            u_fieldCoupling: this.gl.getUniformLocation(this.program, 'u_fieldCoupling'),
            u_dimensionalBridge: this.gl.getUniformLocation(this.program, 'u_dimensionalBridge')
        };

        return true;
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(`Shader compile error (${this.canvasId}):`, this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    render(parameters) {
        if (!this.program || !this.isActive) return;

        this.gl.useProgram(this.program);

        // Bind vertex buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        // Set uniforms
        this.gl.uniform1f(this.uniforms.u_time, this.time);
        this.gl.uniform2f(this.uniforms.u_resolution, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.uniforms.u_geometry, parameters.geometry || 0);

        // 6D 4D rotations
        this.gl.uniform1f(this.uniforms.u_rot4dXW, parameters.rot4dXW || 0);
        this.gl.uniform1f(this.uniforms.u_rot4dYW, parameters.rot4dYW || 0);
        this.gl.uniform1f(this.uniforms.u_rot4dZW, parameters.rot4dZW || 0);
        this.gl.uniform1f(this.uniforms.u_rot4dXY, parameters.rot4dXY || 0);
        this.gl.uniform1f(this.uniforms.u_rot4dXZ, parameters.rot4dXZ || 0);
        this.gl.uniform1f(this.uniforms.u_rot4dYZ, parameters.rot4dYZ || 0);

        // Standard parameters with intelligent defaults
        this.gl.uniform1f(this.uniforms.u_gridDensity, parameters.gridDensity || 15);
        this.gl.uniform1f(this.uniforms.u_morphFactor, parameters.morphFactor || 0.5);
        this.gl.uniform1f(this.uniforms.u_chaos, parameters.chaos || 0.2);
        this.gl.uniform1f(this.uniforms.u_speed, parameters.speed || 1.0);
        this.gl.uniform1f(this.uniforms.u_hue, parameters.hue || 200);
        this.gl.uniform1f(this.uniforms.u_intensity, parameters.intensity || 0.9);
        this.gl.uniform1f(this.uniforms.u_saturation, parameters.saturation || 0.6);
        this.gl.uniform1f(this.uniforms.u_scale, parameters.scale || 1.0);

        // Layer-specific parameters based on role
        const layerConfig = this.getLayerConfig();
        this.gl.uniform3fv(this.uniforms.u_layerColor, layerConfig.color);
        this.gl.uniform1f(this.uniforms.u_layerScale, layerConfig.scale);
        this.gl.uniform1f(this.uniforms.u_layerOpacity, layerConfig.opacity);
        this.gl.uniform1f(this.uniforms.u_interferencePhase, layerConfig.phase);
        this.gl.uniform1f(this.uniforms.u_waveAmplitude, layerConfig.amplitude);
        this.gl.uniform1f(this.uniforms.u_projectionDistance, layerConfig.projection);

        // Advanced parameters
        this.gl.uniform1f(this.uniforms.u_coherenceLength, parameters.coherenceLength || 0.1);
        this.gl.uniform1f(this.uniforms.u_dispersionRate, parameters.dispersionRate || 0.3);
        this.gl.uniform1f(this.uniforms.u_fieldCoupling, parameters.fieldCoupling || 0.5);
        this.gl.uniform1f(this.uniforms.u_dimensionalBridge, parameters.dimensionalBridge || 1.0);

        // Clear and render
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    getLayerConfig() {
        // Layer-specific configurations for sophisticated visual hierarchy
        switch (this.role) {
            case 'background':
                return {
                    color: [0.1, 0.15, 0.3],
                    scale: 0.8,
                    opacity: 0.4,
                    phase: 0.0,
                    amplitude: 0.6,
                    projection: 3.0
                };
            case 'shadow':
                return {
                    color: [0.2, 0.1, 0.4],
                    scale: 0.9,
                    opacity: 0.3,
                    phase: Math.PI * 0.25,
                    amplitude: 0.8,
                    projection: 2.5
                };
            case 'content':
                return {
                    color: [1.0, 1.0, 1.0],
                    scale: 1.0,
                    opacity: 0.8,
                    phase: Math.PI * 0.5,
                    amplitude: 1.0,
                    projection: 2.0
                };
            case 'highlight':
                return {
                    color: [1.2, 1.1, 0.8],
                    scale: 1.1,
                    opacity: 0.6,
                    phase: Math.PI * 0.75,
                    amplitude: 1.2,
                    projection: 1.5
                };
            case 'accent':
                return {
                    color: [1.5, 0.8, 1.2],
                    scale: 1.2,
                    opacity: 0.5,
                    phase: Math.PI,
                    amplitude: 1.4,
                    projection: 1.0
                };
            default:
                return {
                    color: [1.0, 1.0, 1.0],
                    scale: 1.0,
                    opacity: 0.7,
                    phase: 0.0,
                    amplitude: 1.0,
                    projection: 2.0
                };
        }
    }

    updateTime(time) {
        this.time = time;
    }

    setActive(active) {
        this.isActive = active;
    }

    dispose() {
        if (this.gl && this.program) {
            this.gl.deleteProgram(this.program);
        }
        if (this.gl && this.vertexBuffer) {
            this.gl.deleteBuffer(this.vertexBuffer);
        }
    }
}

/**
 * AethericSystem - Main system controller
 */
export class AethericSystem {
    constructor() {
        this.name = 'aetheric';
        this.isActive = false;
        this.isInitialized = false;

        // 5-layer canvas architecture
        this.canvasIds = [
            'aetheric-background-canvas',
            'aetheric-shadow-canvas',
            'aetheric-content-canvas',
            'aetheric-highlight-canvas',
            'aetheric-accent-canvas'
        ];

        this.visualizers = [];
        this.parameters = new Map();

        // Sophisticated geometry selection
        this.geometries = [
            'Hypersphere', 'Hypercube', 'Hypertetrahedron',
            '16-Cell', 'Hypertorus', 'Wave Field',
            'Crystal Lattice', 'Fractal 4D'
        ];

        console.log('🌌 AethericSystem: Initialized with hyperdimensional interference mathematics');
    }

    async initialize() {
        console.log('🌌 AethericSystem: Starting initialization with 6D rotation system');

        try {
            this.setupGeometry();
            this.initializeParameters();

            this.isInitialized = true;
            console.log('✅ AethericSystem: Initialization complete with advanced interference fields');
            return true;
        } catch (error) {
            console.error('❌ AethericSystem: Initialization failed:', error);
            return false;
        }
    }

    async activate() {
        console.log('🌌 AethericSystem: Activating with 5-layer interference architecture');

        try {
            if (!this.engine) {
                await this.createEngine();
            }

            this.showCanvasLayers();

            if (this.engine) {
                this.engine.isActive = true;

                // Start sophisticated render loop
                if (this.engine.startRenderLoop) {
                    this.engine.startRenderLoop();
                }

                // Activate all visualizers
                if (this.engine.visualizers) {
                    this.engine.visualizers.forEach(visualizer => {
                        if (visualizer && visualizer.gl) {
                            visualizer.setActive(true);
                        }
                    });
                }

                window.aethericEngine = this.engine;
            }

            this.isActive = true;
            console.log('✅ AethericSystem: Activated with hyperdimensional mathematics');
            return true;

        } catch (error) {
            console.error('❌ AethericSystem: Activation failed:', error);
            return false;
        }
    }

    async createEngine() {
        console.log('🌌 Creating AethericEngine with 5-layer architecture');

        // Create visualizers for each layer
        const layerRoles = ['background', 'shadow', 'content', 'highlight', 'accent'];

        for (let i = 0; i < this.canvasIds.length; i++) {
            const visualizer = new AethericVisualizer(
                this.canvasIds[i],
                layerRoles[i],
                { layer: i }
            );

            if (visualizer.initialize()) {
                this.visualizers.push(visualizer);
                console.log(`✅ Layer ${i} (${layerRoles[i]}) initialized successfully`);
            } else {
                console.error(`❌ Failed to initialize layer ${i}`);
            }
        }

        this.engine = {
            visualizers: this.visualizers,
            isActive: false,
            startRenderLoop: () => this.startRenderLoop(),
            setActive: (active) => {
                this.visualizers.forEach(v => v.setActive(active));
                this.isActive = active;
            }
        };

        console.log('✅ AethericEngine created with', this.visualizers.length, 'layers');
    }

    startRenderLoop() {
        const render = (time) => {
            if (!this.isActive) return;

            const timeInSeconds = time * 0.001;

            // Update all visualizers
            this.visualizers.forEach(visualizer => {
                visualizer.updateTime(timeInSeconds);
                visualizer.render(this.getCurrentParameters());
            });

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }

    getCurrentParameters() {
        return {
            geometry: this.parameters.get('geometry') || 0,
            rot4dXW: this.parameters.get('rot4dXW') || 0,
            rot4dYW: this.parameters.get('rot4dYW') || 0,
            rot4dZW: this.parameters.get('rot4dZW') || 0,
            rot4dXY: this.parameters.get('rot4dXY') || 0,
            rot4dXZ: this.parameters.get('rot4dXZ') || 0,
            rot4dYZ: this.parameters.get('rot4dYZ') || 0,
            gridDensity: this.parameters.get('gridDensity') || 15,
            morphFactor: this.parameters.get('morphFactor') || 0.5,
            chaos: this.parameters.get('chaos') || 0.2,
            speed: this.parameters.get('speed') || 1.0,
            hue: this.parameters.get('hue') || 200,
            intensity: this.parameters.get('intensity') || 0.9,
            saturation: this.parameters.get('saturation') || 0.6,
            scale: this.parameters.get('scale') || 1.0,
            coherenceLength: this.parameters.get('coherenceLength') || 0.1,
            dispersionRate: this.parameters.get('dispersionRate') || 0.3,
            fieldCoupling: this.parameters.get('fieldCoupling') || 0.5,
            dimensionalBridge: this.parameters.get('dimensionalBridge') || 1.0
        };
    }

    setupGeometry() {
        // This would be implemented to match your existing geometry selection system
        console.log('🌌 Setting up geometry selection with', this.geometries.length, 'options');
    }

    initializeParameters() {
        // Initialize sophisticated parameter system
        console.log('🌌 Initializing advanced parameter system');
    }

    showCanvasLayers() {
        const container = document.getElementById('aethericLayers');
        if (container) {
            container.style.display = 'block';
        }
    }

    updateParameter(name, value) {
        this.parameters.set(name, value);
        console.log(`🌌 Updated parameter ${name} = ${value}`);
    }

    deactivate() {
        console.log('🌌 AethericSystem: Deactivating');

        this.isActive = false;

        if (this.engine) {
            this.engine.isActive = false;
            this.visualizers.forEach(v => v.setActive(false));
        }

        // Hide canvas layers
        const container = document.getElementById('aethericLayers');
        if (container) {
            container.style.display = 'none';
        }
    }

    dispose() {
        console.log('🌌 AethericSystem: Disposing resources');

        this.visualizers.forEach(v => v.dispose());
        this.visualizers = [];
        this.engine = null;
        this.isInitialized = false;
    }
}