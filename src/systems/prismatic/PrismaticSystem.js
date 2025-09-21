/**
 * PRISMATIC System - 5-Layer Hyperdimensional Chromatic Dispersion Engine
 *
 * Features:
 * - 6 degrees of 4D rotation with advanced polytopal projections
 * - 5 layered canvases with sophisticated ray-marching and refraction
 * - Advanced SDF mathematics for multiple 4D polytopes
 * - True chromatic dispersion with wavelength-dependent refraction
 * - Intelligent material system with subsurface scattering
 * - Multi-octave fresnel calculations and caustic generation
 */

/**
 * PrismaticVisualizer - Individual layer renderer for hyperdimensional refraction
 */
class PrismaticVisualizer {
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

        console.log(`🔮 WebGL context created for ${this.canvasId}: ${this.gl instanceof WebGL2RenderingContext ? 'WebGL2' : 'WebGL1'}`);

        if (!this.createPrismaticShader()) {
            console.error(`❌ Failed to create shader for ${this.canvasId}`);
            return false;
        }

        this.setupCanvasSize();
        this.setupVertexBuffer();

        // Enable sophisticated blending for refraction effects
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        return true;
    }

    setupCanvasSize() {
        const container = document.getElementById('prismaticLayers');
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
        console.log(`🔮 Canvas ${this.canvasId} WebGL viewport: ${this.canvas.width}x${this.canvas.height}`);
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

    createPrismaticShader() {
        const isWebGL2 = this.gl instanceof WebGL2RenderingContext;

        const vertexShader = isWebGL2 ? `#version 300 es
            in vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        ` : `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        let fragmentShader;
        if (isWebGL2) {
            fragmentShader = `#version 300 es
precision highp float;
out vec4 fragColor;

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
            uniform float u_refractionIndex;
            uniform float u_dispersionStrength;
            uniform float u_projectionDistance;

            // Advanced chromatic dispersion parameters
            uniform float u_wavelengthRange;
            uniform float u_cauchyCoefficient;
            uniform float u_subsurfaceScattering;
            uniform float u_fresnelPower;
            uniform float u_causticIntensity;
            uniform float u_materialDensity;
            uniform float u_surfaceRoughness;

            // Ray marching parameters
            uniform float u_marchingSteps;
            uniform float u_marchingPrecision;
            uniform float u_maxDistance;

            // Constants for advanced optics
            const float PI = 3.14159265359;
            const vec3 WAVELENGTHS = vec3(700.0, 546.1, 435.8); // Red, Green, Blue nanometers
            const float AIR_IOR = 1.0;

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

            // ADVANCED: Hash functions for procedural detail
            float hash11(float p) {
                p = fract(p * 0.1031);
                p *= p + 33.33;
                p *= p + p;
                return fract(p);
            }

            float hash21(vec2 p) {
                vec3 p3 = fract(vec3(p.xyx) * 0.1031);
                p3 += dot(p3, p3.yzx + 33.33);
                return fract((p3.x + p3.y) * p3.z);
            }

            vec3 hash33(vec3 p3) {
                p3 = fract(p3 * vec3(.1031, .1030, .0973));
                p3 += dot(p3, p3.yxz+33.33);
                return fract((p3.xxy + p3.yxx)*p3.zyx);
            }

            // ADVANCED: Sophisticated 4D SDF functions for polytopes
            float sdf4DHypersphere(vec4 pos, float radius) {
                return length(pos) - radius;
            }

            float sdf4DHypercube(vec4 pos, vec4 size) {
                vec4 d = abs(pos) - size;
                return length(max(d, 0.0)) + min(max(d.x, max(d.y, max(d.z, d.w))), 0.0);
            }

            float sdf4D5Cell(vec4 pos) {
                // 4D regular simplex (5-cell)
                float s = 0.5;
                vec4 n1 = normalize(vec4(1,1,1,1));
                vec4 n2 = normalize(vec4(1,-1,-1,1));
                vec4 n3 = normalize(vec4(-1,1,-1,1));
                vec4 n4 = normalize(vec4(-1,-1,1,1));
                vec4 n5 = normalize(vec4(0,0,0,-1));

                float d = dot(pos, n1) - s;
                d = max(d, dot(pos, n2) - s);
                d = max(d, dot(pos, n3) - s);
                d = max(d, dot(pos, n4) - s);
                d = max(d, dot(pos, n5) - s);
                return d;
            }

            float sdf4D16Cell(vec4 pos) {
                // 4D cross-polytope (16-cell)
                return abs(pos.x) + abs(pos.y) + abs(pos.z) + abs(pos.w) - 0.7;
            }

            float sdf4D24Cell(vec4 pos) {
                // 4D 24-cell approximation using octahedral symmetry
                vec4 p = abs(pos);
                float d1 = (p.x + p.y + p.z - p.w) * 0.57735;
                float d2 = (p.x + p.y - p.z + p.w) * 0.57735;
                float d3 = (p.x - p.y + p.z + p.w) * 0.57735;
                float d4 = (-p.x + p.y + p.z + p.w) * 0.57735;
                return max(max(d1, d2), max(d3, d4)) - 0.5;
            }

            float sdf4D120Cell(vec4 pos) {
                // 4D 120-cell approximation (dodecahedral)
                vec4 p = pos;
                float phi = 1.618033988749895; // Golden ratio

                // Dodecahedral distance approximation in 4D
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
                // 4D 600-cell approximation (icosahedral)
                vec4 p = pos;
                float phi = 1.618033988749895;

                // Icosahedral distance approximation in 4D
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
                // 4D torus
                vec2 t1 = vec2(length(pos.xy) - R, pos.z);
                vec2 t2 = vec2(length(t1) - r, pos.w);
                return length(t2) - r * 0.5;
            }

            float sdf4DKleinBottle(vec4 pos) {
                // 4D Klein bottle approximation
                vec4 p = pos;
                float a = 2.0;
                float n = 1.0;

                float x = p.x;
                float y = p.y;
                float z = p.z;
                float w = p.w;

                float f = (x*x + y*y + z*z + w*w + a*a - n*n);
                f *= f;
                f -= 4.0*a*a*(x*x + y*y);

                return f * 0.1 - 0.3;
            }

            // ADVANCED: Multi-geometry morphing system with 4D transformations
            float geometryField(vec4 pos) {
                vec4 transformed = transform4D(pos);

                float field = 0.0;
                float g = u_geometry;

                // Morphing between sophisticated 4D polytopes
                if (g < 1.0) {
                    field = sdf4DHypersphere(transformed, 0.5 + 0.2 * sin(u_time * u_speed));
                }
                else if (g < 2.0) {
                    field = sdf4DHypercube(transformed, vec4(0.4 + 0.1 * u_morphFactor));
                }
                else if (g < 3.0) {
                    field = sdf4D5Cell(transformed * (1.0 + 0.3 * u_morphFactor));
                }
                else if (g < 4.0) {
                    field = sdf4D16Cell(transformed);
                }
                else if (g < 5.0) {
                    field = sdf4D24Cell(transformed * 0.8);
                }
                else if (g < 6.0) {
                    field = sdf4D120Cell(transformed * 0.6);
                }
                else if (g < 7.0) {
                    field = sdf4D600Cell(transformed * 0.7);
                }
                else if (g < 8.0) {
                    field = sdf4DHypertorus(transformed, 0.4, 0.2);
                }
                else if (g < 9.0) {
                    field = sdf4DKleinBottle(transformed * 0.5);
                }
                else {
                    // Complex morphing between multiple forms
                    float w1 = sin(u_time * u_speed * 0.3) * 0.5 + 0.5;
                    float w2 = cos(u_time * u_speed * 0.5) * 0.5 + 0.5;

                    float f1 = sdf4D5Cell(transformed);
                    float f2 = sdf4D24Cell(transformed);
                    float f3 = sdf4DHypersphere(transformed, 0.6);

                    field = mix(mix(f1, f2, w1), f3, w2);
                }

                // Add surface detail with 4D noise
                vec3 noisePos = project4Dto3D(transformed);
                float surfaceNoise = hash21(noisePos.xy * u_gridDensity) * 0.5 +
                                   hash21(noisePos.yz * u_gridDensity * 1.7) * 0.3 +
                                   hash21(noisePos.zx * u_gridDensity * 2.3) * 0.2;

                field += (surfaceNoise - 0.5) * u_chaos * 0.05;

                return field;
            }

            // ADVANCED: 4D gradient calculation for accurate normals
            vec4 calcGradient4D(vec4 pos) {
                vec2 e = vec2(0.001, 0.0);
                float d = geometryField(pos);

                return vec4(
                    geometryField(pos + e.xyxx) - d,
                    geometryField(pos + e.yxxx) - d,
                    geometryField(pos + e.yyxx) - d,
                    geometryField(pos + e.yyyx) - d
                ) / e.x;
            }

            // ADVANCED: 3D normal from 4D gradient projection
            vec3 calcNormal(vec4 pos4d) {
                vec4 grad4d = calcGradient4D(pos4d);
                vec3 grad3d = project4Dto3D(grad4d);
                return normalize(grad3d);
            }

            // ADVANCED: Cauchy dispersion formula for realistic chromatic dispersion
            float cauchyDispersion(float wavelength, float n0, float B) {
                float wl2 = wavelength * wavelength;
                return n0 + B / wl2;
            }

            // ADVANCED: Wavelength-dependent refraction index
            vec3 getRefractionIndices(float baseIOR) {
                float B = u_cauchyCoefficient * u_dispersionStrength;

                return vec3(
                    cauchyDispersion(WAVELENGTHS.x, baseIOR, B), // Red
                    cauchyDispersion(WAVELENGTHS.y, baseIOR, B), // Green
                    cauchyDispersion(WAVELENGTHS.z, baseIOR, B)  // Blue
                );
            }

            // ADVANCED: Fresnel calculation with polarization
            float fresnelReflectance(vec3 normal, vec3 incident, float ior) {
                float cosI = abs(dot(normal, incident));
                float sinT2 = (1.0 - cosI * cosI) / (ior * ior);

                if (sinT2 >= 1.0) return 1.0; // Total internal reflection

                float cosT = sqrt(1.0 - sinT2);

                float rs = (ior * cosI - cosT) / (ior * cosI + cosT);
                float rp = (cosI - ior * cosT) / (cosI + ior * cosT);

                return (rs * rs + rp * rp) * 0.5;
            }

            // ADVANCED: 4D ray marching with adaptive step size
            float rayMarch4D(vec4 rayOrigin, vec4 rayDirection, out vec4 hitPoint) {
                float totalDistance = 0.0;
                vec4 currentPos = rayOrigin;

                for (int i = 0; i < int(u_marchingSteps); i++) {
                    float distance = geometryField(currentPos);

                    if (distance < u_marchingPrecision) {
                        hitPoint = currentPos;
                        return totalDistance;
                    }

                    if (totalDistance > u_maxDistance) {
                        break;
                    }

                    // Adaptive step size based on distance and chaos
                    float stepSize = distance * (0.8 + 0.4 * u_chaos);
                    currentPos += rayDirection * stepSize;
                    totalDistance += stepSize;
                }

                hitPoint = currentPos;
                return -1.0; // No hit
            }

            // ADVANCED: Environment mapping with 4D basis transformation
            vec3 environmentColor(vec4 direction4d) {
                vec4 transformed = transform4D(direction4d);
                vec3 dir3d = normalize(project4Dto3D(transformed));

                // 4D-influenced gradient
                float elevation = dir3d.y * 0.5 + 0.5;
                float azimuth = atan(dir3d.z, dir3d.x) / (2.0 * PI) + 0.5;

                // Hyperdimensional hue shifting
                float hueShift = (transformed.w + sin(azimuth * 4.0) * transformed.x) * 30.0;
                float finalHue = mod(u_hue + hueShift, 360.0);

                // Generate gradient
                vec3 topColor = vec3(0.2, 0.4, 0.8);
                vec3 horizonColor = vec3(0.8, 0.6, 0.4);
                vec3 bottomColor = vec3(0.1, 0.1, 0.2);

                vec3 envColor;
                if (elevation > 0.5) {
                    envColor = mix(horizonColor, topColor, (elevation - 0.5) * 2.0);
                } else {
                    envColor = mix(bottomColor, horizonColor, elevation * 2.0);
                }

                // Apply hue rotation
                float hueRad = radians(finalHue);
                mat3 hueMatrix = mat3(
                    cos(hueRad), -sin(hueRad), 0,
                    sin(hueRad), cos(hueRad), 0,
                    0, 0, 1
                );

                return hueMatrix * envColor * u_intensity;
            }

            // ADVANCED: Subsurface scattering approximation
            vec3 subsurfaceScattering(vec3 lightDir, vec3 normal, vec3 viewDir, vec3 albedo) {
                float scatterDot = dot(lightDir, -viewDir);
                float scatter = pow(max(0.0, scatterDot), u_fresnelPower) * u_subsurfaceScattering;
                return albedo * scatter;
            }

            void main() {
                vec2 screenCoord = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
                screenCoord.x *= u_resolution.x / u_resolution.y;

                // Setup 4D ray
                vec4 rayOrigin = vec4(0, 0, 3, 0);
                vec4 rayDirection = normalize(vec4(screenCoord * u_scale, -1, sin(u_time * u_speed * 0.1) * 0.2));

                // Ray march in 4D space
                vec4 hitPoint;
                float hitDistance = rayMarch4D(rayOrigin, rayDirection, hitPoint);

                if (hitDistance < 0.0) {
                    // Background environment
                    vec3 envColor = environmentColor(rayDirection);

                    // Layer-specific background effects
                    float layerEffect = u_layerScale * u_layerOpacity;
                    envColor = mix(envColor, u_layerColor, 0.2) * layerEffect;

                    // Vignette
                    float vignette = 1.0 - length(screenCoord) * 0.3;
                    ${isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(envColor * vignette, layerEffect * 0.8);
                    return;
                }

                // Calculate surface properties
                vec3 normal = calcNormal(hitPoint);
                vec3 viewDir = normalize(project4Dto3D(rayOrigin - hitPoint));

                // Get wavelength-dependent refraction indices
                vec3 iorRGB = getRefractionIndices(u_refractionIndex);

                // Calculate refracted rays for each color channel
                vec3 refractionR = refract(-viewDir, normal, 1.0 / iorRGB.x);
                vec3 refractionG = refract(-viewDir, normal, 1.0 / iorRGB.y);
                vec3 refractionB = refract(-viewDir, normal, 1.0 / iorRGB.z);

                // Sample environment for each refracted ray
                vec3 envR = environmentColor(vec4(refractionR, 0.5));
                vec3 envG = environmentColor(vec4(refractionG, 0.5));
                vec3 envB = environmentColor(vec4(refractionB, 0.5));

                // Chromatic dispersion result
                vec3 refractionColor = vec3(envR.r, envG.g, envB.b);

                // Fresnel reflection
                float fresnel = fresnelReflectance(normal, viewDir, iorRGB.g);
                vec3 reflectionDir = reflect(-viewDir, normal);
                vec3 reflectionColor = environmentColor(vec4(reflectionDir, 0.0));

                // Surface material properties
                float roughness = u_surfaceRoughness * (1.0 + u_chaos);
                float materialEffect = u_materialDensity;

                // Add surface roughness
                if (roughness > 0.0) {
                    vec3 roughnessOffset = hash33(project4Dto3D(hitPoint) * u_gridDensity) * 2.0 - 1.0;
                    normal = normalize(normal + roughnessOffset * roughness);
                }

                // Subsurface scattering
                vec3 scatterColor = subsurfaceScattering(reflectionDir, normal, viewDir, refractionColor);

                // Combine effects
                vec3 finalColor = mix(refractionColor, reflectionColor, fresnel);
                finalColor += scatterColor * materialEffect;

                // Caustic effects
                float causticPattern = sin(hitPoint.x * u_gridDensity + u_time * u_speed) *
                                     sin(hitPoint.y * u_gridDensity + u_time * u_speed * 1.2) *
                                     sin(hitPoint.z * u_gridDensity + u_time * u_speed * 0.8);
                finalColor += abs(causticPattern) * u_causticIntensity * vec3(1.2, 1.0, 0.8);

                // Layer-specific effects
                finalColor = mix(finalColor, u_layerColor, 0.1);
                finalColor *= u_layerScale;

                // Distance attenuation
                float attenuation = exp(-hitDistance * 0.1);
                finalColor *= attenuation;

                // Final alpha based on layer and material properties
                float alpha = u_layerOpacity * materialEffect * attenuation;

                ${isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(finalColor * u_intensity, alpha);
            }
        `;
        } else {
            fragmentShader = `precision highp float;

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
            uniform float u_refractionIndex;
            uniform float u_dispersionStrength;
            uniform float u_projectionDistance;

            // Advanced chromatic dispersion parameters
            uniform float u_wavelengthRange;
            uniform float u_cauchyCoefficient;
            uniform float u_subsurfaceScattering;
            uniform float u_fresnelPower;
            uniform float u_causticIntensity;
            uniform float u_materialDensity;
            uniform float u_surfaceRoughness;

            // HYPERDIMENSIONAL 4D POLYTOPE LIBRARY - ADVANCED MATHEMATICS
            // Signed Distance Functions for 6 regular 4D polytopes and advanced surfaces

            // 4D Hypersphere (Glome) with advanced surface deformation
            float sdf4DHypersphere(vec4 pos, float radius) {
                return length(pos) - radius;
            }

            // 4D Hypercube (Tesseract) with internal structure
            float sdf4DHypercube(vec4 pos, float size) {
                vec4 d = abs(pos) - vec4(size);
                return min(max(d.x, max(d.y, max(d.z, d.w))), 0.0) + length(max(d, 0.0));
            }

            // 4D 5-Cell (Hypertetrahedron) - Simplex
            float sdf4D5Cell(vec4 pos) {
                vec4 p = pos;
                float d = dot(p, normalize(vec4(1.0))) - 0.8;
                p = abs(p);
                d = max(d, dot(p, normalize(vec4(-1.0, 3.0, 3.0, 3.0))) - 0.8);
                d = max(d, dot(p, normalize(vec4(3.0, -1.0, 3.0, 3.0))) - 0.8);
                d = max(d, dot(p, normalize(vec4(3.0, 3.0, -1.0, 3.0))) - 0.8);
                d = max(d, dot(p, normalize(vec4(3.0, 3.0, 3.0, -1.0))) - 0.8);
                return d;
            }

            // 4D 16-Cell (Hyperoctahedron) - Dual of tesseract
            float sdf4D16Cell(vec4 pos) {
                vec4 p = abs(pos);
                return (p.x + p.y + p.z + p.w - 1.2);
            }

            // 4D 24-Cell - Self-dual regular polytope
            float sdf4D24Cell(vec4 pos) {
                vec4 p = pos;
                float d = length(p) - 1.0;

                // Create 24-cell through cross-polytope construction
                vec4 q = abs(p);
                d = min(d, max(q.x + q.y - 0.8, max(q.z + q.w - 0.8, max(q.x + q.z - 0.8, q.y + q.w - 0.8))));

                return d;
            }

            // 4D 120-Cell - Golden ratio polytope (most complex)
            float sdf4D120Cell(vec4 pos) {
                vec4 p = pos;
                float phi = 1.618033988749895; // Golden ratio φ
                vec4 n = normalize(vec4(phi, 1.0, 0.0, 1.0/phi));
                float d = abs(dot(p, n)) - 0.85;

                // Create dodecahedral cell structure
                for (int i = 0; i < 3; i++) {
                    p = abs(p) - vec4(0.3);
                    p = p.yzwx;
                    d = min(d, abs(dot(p, n)) - 0.7);
                }

                return d;
            }

            // 4D 600-Cell - Dual of 120-cell
            float sdf4D600Cell(vec4 pos) {
                vec4 p = pos;
                float phi = 1.618033988749895;

                // Create icosahedral cell structure
                float d = length(p) - 1.0;
                p = abs(p);
                float t = (1.0 + sqrt(5.0)) * 0.5; // Golden ratio
                d = min(d, length(p - vec4(1.0, t, 0.0, 1.0/t)) - 0.3);
                d = min(d, length(p - vec4(t, 0.0, 1.0/t, 1.0)) - 0.3);
                d = min(d, length(p - vec4(0.0, 1.0/t, 1.0, t)) - 0.3);

                return d;
            }

            // Klein Bottle in 4D - Non-orientable surface
            float sdf4DKleinBottle(vec4 pos) {
                vec4 p = pos;
                float r = 0.5;
                float R = 1.0;

                // Klein bottle parametrization in 4D
                float u = atan(p.y, p.x);
                float v = atan(p.w, p.z);

                vec4 klein = vec4(
                    (R + r * cos(v)) * cos(u),
                    (R + r * cos(v)) * sin(u),
                    r * sin(v) * cos(u * 0.5),
                    r * sin(v) * sin(u * 0.5)
                );

                return length(p - klein) - 0.1;
            }

            // Advanced Quantum Field Surface
            float sdf4DQuantumField(vec4 pos) {
                vec4 p = pos;
                float field = 0.0;

                // Multi-scale quantum fluctuations
                for (int i = 0; i < 4; i++) {
                    float scale = pow(2.0, float(i));
                    field += sin(p.x * scale) * cos(p.y * scale) * sin(p.z * scale) * cos(p.w * scale) / scale;
                }

                return length(p) - 1.0 + field * 0.3;
            }

            // 4D Rotations - Complete 6-dimensional rotation group
            vec4 rotate4D(vec4 pos, float angleXW, float angleYW, float angleZW,
                         float angleXY, float angleXZ, float angleYZ) {
                vec4 p = pos;

                // XW plane rotation
                float c = cos(angleXW), s = sin(angleXW);
                p = vec4(c*p.x - s*p.w, p.y, p.z, s*p.x + c*p.w);

                // YW plane rotation
                c = cos(angleYW); s = sin(angleYW);
                p = vec4(p.x, c*p.y - s*p.w, p.z, s*p.y + c*p.w);

                // ZW plane rotation
                c = cos(angleZW); s = sin(angleZW);
                p = vec4(p.x, p.y, c*p.z - s*p.w, s*p.z + c*p.w);

                // XY plane rotation
                c = cos(angleXY); s = sin(angleXY);
                p = vec4(c*p.x - s*p.y, s*p.x + c*p.y, p.z, p.w);

                // XZ plane rotation
                c = cos(angleXZ); s = sin(angleXZ);
                p = vec4(c*p.x - s*p.z, p.y, s*p.x + c*p.z, p.w);

                // YZ plane rotation
                c = cos(angleYZ); s = sin(angleYZ);
                p = vec4(p.x, c*p.y - s*p.z, s*p.y + c*p.z, p.w);

                return p;
            }

            // 4D to 3D projection with perspective
            vec3 project4Dto3D(vec4 pos4d, float projectionDistance) {
                float w = pos4d.w + projectionDistance;
                if (w < 0.1) w = 0.1; // Prevent division by zero
                return pos4d.xyz / w;
            }

            // 4D POLYTOPE LATTICE PROJECTION SYSTEM
            // The entire screen represents 3D projections of 4D polytope through layered lattice grids
            float marchRay4D(vec3 rayStart, vec3 rayDir, out float hitDistance) {
                hitDistance = 0.0;
                float totalDistance = 0.0;

                for (int i = 0; i < 32; i++) { // Reduced iterations for lattice approach
                    vec3 currentPos = rayStart + rayDir * totalDistance;

                    // 4D MATRIX-BASED LATTICE TRANSFORMATION SYSTEM
                    // Create multiple lattice layers representing different 4D cross-sections
                    float distance = 1000.0;

                    // Layer 1: Primary 4D lattice structure
                    vec4 pos4d_layer1 = vec4(currentPos, u_time * u_speed * 0.1);
                    pos4d_layer1 = rotate4D(pos4d_layer1, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);

                    // Project 4D position to 3D lattice coordinates
                    vec3 lattice3d_1 = project4Dto3D(pos4d_layer1, 2.0 + sin(u_time * 0.1));
                    float spacing1 = u_scale * (1.0 + 0.3 * sin(u_rot4dXW + u_time * 0.05));
                    vec3 grid1 = mod(lattice3d_1, spacing1) - spacing1 * 0.5;

                    // LINE THICKNESS CONTROL - DRAMATICALLY responsive to gridDensity parameter
                    float lineThickness1 = (0.01 + u_gridDensity * 0.25) * u_scale; // 5x more responsive
                    float lattice1 = length(max(abs(grid1) - vec3(lineThickness1), 0.0));

                    // Layer 2: Secondary lattice with different 4D rotation
                    vec4 pos4d_layer2 = vec4(currentPos, u_time * u_speed * 0.15 + 1.57);
                    pos4d_layer2 = rotate4D(pos4d_layer2,
                        u_rot4dXW + 0.5, u_rot4dYW + 0.3, u_rot4dZW + 0.7,
                        u_rot4dXY + 0.2, u_rot4dXZ + 0.8, u_rot4dYZ + 0.4);

                    vec3 lattice3d_2 = project4Dto3D(pos4d_layer2, 1.5 + cos(u_time * 0.08));
                    float spacing2 = u_scale * (0.8 + 0.2 * cos(u_rot4dYW + u_time * 0.07));
                    vec3 grid2 = mod(lattice3d_2, spacing2) - spacing2 * 0.5;

                    // LINE THICKNESS CONTROL - DRAMATICALLY responsive with different layer interaction
                    float lineThickness2 = (0.008 + u_gridDensity * 0.20) * u_scale; // 5x more responsive
                    float lattice2 = length(max(abs(grid2) - vec3(lineThickness2), 0.0));

                    // Layer 3: Tertiary lattice with hyperspatial phase shift
                    vec4 pos4d_layer3 = vec4(currentPos, u_time * u_speed * 0.08 + 3.14);
                    pos4d_layer3 = rotate4D(pos4d_layer3,
                        u_rot4dXW + 1.0, u_rot4dYW + 0.6, u_rot4dZW + 0.2,
                        u_rot4dXY + 1.2, u_rot4dXZ + 0.4, u_rot4dYZ + 0.9);

                    vec3 lattice3d_3 = project4Dto3D(pos4d_layer3, 3.0 + sin(u_time * 0.06) * 0.5);
                    float spacing3 = u_scale * (1.2 + 0.4 * sin(u_rot4dZW + u_time * 0.04));
                    vec3 grid3 = mod(lattice3d_3, spacing3) - spacing3 * 0.5;

                    // EXTREMELY DRAMATIC LINE THICKNESS CONTROL - Maximum responsiveness
                    float lineThickness3 = (0.005 + u_gridDensity * 0.30) * u_scale; // 4x more responsive
                    float lattice3 = length(max(abs(grid3) - vec3(lineThickness3), 0.0));

                    // Layer 4: Quaternary lattice with complex 4D interference
                    vec4 pos4d_layer4 = vec4(currentPos, u_time * u_speed * 0.12 + 4.71);
                    pos4d_layer4 = rotate4D(pos4d_layer4,
                        u_rot4dXW + 1.5, u_rot4dYW + 0.9, u_rot4dZW + 0.4,
                        u_rot4dXY + 0.7, u_rot4dXZ + 1.1, u_rot4dYZ + 0.3);

                    vec3 lattice3d_4 = project4Dto3D(pos4d_layer4, 2.5 + cos(u_time * 0.09) * 0.3);
                    float spacing4 = u_scale * (0.9 + 0.3 * cos(u_rot4dXY + u_time * 0.06));
                    vec3 grid4 = mod(lattice3d_4, spacing4) - spacing4 * 0.5;

                    float lineThickness4 = (0.003 + u_gridDensity * 0.35) * u_scale; // 3.5x more responsive
                    float lattice4 = length(max(abs(grid4) - vec3(lineThickness4), 0.0));

                    // Layer 5: Quintessential lattice with full 4D complexity
                    vec4 pos4d_layer5 = vec4(currentPos, u_time * u_speed * 0.18 + 6.28);
                    pos4d_layer5 = rotate4D(pos4d_layer5,
                        u_rot4dXW + 2.0, u_rot4dYW + 1.2, u_rot4dZW + 0.8,
                        u_rot4dXY + 1.6, u_rot4dXZ + 0.5, u_rot4dYZ + 1.4);

                    vec3 lattice3d_5 = project4Dto3D(pos4d_layer5, 1.8 + sin(u_time * 0.11) * 0.4);
                    float spacing5 = u_scale * (1.4 + 0.5 * sin(u_rot4dXZ + u_time * 0.03));
                    vec3 grid5 = mod(lattice3d_5, spacing5) - spacing5 * 0.5;

                    float lineThickness5 = (0.006 + u_gridDensity * 0.40) * u_scale; // 3.3x more responsive
                    float lattice5 = length(max(abs(grid5) - vec3(lineThickness5), 0.0));

                    // MOIRE EFFECTS - Layer interference patterns
                    float moirePattern1 = sin(lattice3d_1.x * 20.0 / spacing1) * sin(lattice3d_2.x * 18.0 / spacing2);
                    float moirePattern2 = cos(lattice3d_3.y * 22.0 / spacing3) * cos(lattice3d_4.y * 16.0 / spacing4);
                    float moirePattern3 = sin(lattice3d_5.z * 24.0 / spacing5) * sin(lattice3d_1.z * 19.0 / spacing1);

                    // Apply DRAMATICALLY VISIBLE moire effects with chaos parameter
                    lattice1 -= moirePattern1 * u_chaos * 0.15; // 7.5x more visible
                    lattice2 -= moirePattern2 * u_chaos * 0.12; // 8x more visible
                    lattice3 -= moirePattern3 * u_chaos * 0.18; // 7.2x more visible
                    lattice4 -= moirePattern1 * u_chaos * 0.14; // 7x more visible
                    lattice5 -= moirePattern2 * u_chaos * 0.16; // 8.9x more visible

                    // POLYTOPE-SPECIFIC LATTICE MODULATION
                    // Different polytopes create different lattice deformation patterns
                    vec4 polytopePos = vec4(currentPos * 0.5, sin(u_time * 0.2) * u_scale);
                    polytopePos = rotate4D(polytopePos, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);

                    float polytopeField = 0.0;
                    if (u_geometry < 1.0) {
                        // Hypersphere creates spherical lattice distortion
                        polytopeField = sdf4DHypersphere(polytopePos, u_scale * 2.0);
                    } else if (u_geometry < 2.0) {
                        // Hypercube creates cubic lattice alignment
                        polytopeField = sdf4DHypercube(polytopePos, u_scale * 1.5);
                    } else if (u_geometry < 3.0) {
                        // 5-Cell creates tetrahedral lattice pattern
                        polytopeField = sdf4D5Cell(polytopePos * (0.8/u_scale));
                    } else if (u_geometry < 4.0) {
                        // 16-Cell creates octahedral lattice symmetry
                        polytopeField = sdf4D16Cell(polytopePos * (0.8/u_scale));
                    } else if (u_geometry < 5.0) {
                        // 24-Cell creates complex lattice intersections
                        polytopeField = sdf4D24Cell(polytopePos * (0.8/u_scale));
                    } else if (u_geometry < 6.0) {
                        // 120-Cell creates golden ratio lattice spacing
                        polytopeField = sdf4D120Cell(polytopePos * (0.8/u_scale));
                    } else if (u_geometry < 7.0) {
                        // 600-Cell creates icosahedral lattice structure
                        polytopeField = sdf4D600Cell(polytopePos * (0.8/u_scale));
                    } else if (u_geometry < 8.0) {
                        // Klein Bottle creates non-orientable lattice topology
                        polytopeField = sdf4DKleinBottle(polytopePos * (0.8/u_scale));
                    } else {
                        // Quantum Field creates fluctuating lattice density
                        polytopeField = sdf4DQuantumField(polytopePos * (0.8/u_scale));
                    }

                    // LATTICE INTERACTION AND DEFORMATION
                    // Polytope field modulates lattice spacing and structure
                    float deformation = polytopeField * 0.1 * u_morphFactor;

                    lattice1 += deformation * sin(u_time + lattice3d_1.x);
                    lattice2 += deformation * cos(u_time + lattice3d_2.y);
                    lattice3 += deformation * sin(u_time + lattice3d_3.z);
                    lattice4 += deformation * cos(u_time + lattice3d_4.x + lattice3d_4.y);
                    lattice5 += deformation * sin(u_time + lattice3d_5.y + lattice3d_5.z);

                    // COMBINE ALL 5 LATTICE LAYERS
                    // All 5 layers create the complete 4D polytope representation
                    distance = min(lattice1, min(lattice2, min(lattice3, min(lattice4, lattice5))));

                    // DRAMATICALLY OPTIMIZED PARAMETER RESPONSIVENESS

                    // GRID DENSITY: Controls line thickness and detail (range 0-1, dramatic effect)
                    // Already applied to line thickness above - creates visible thickness changes

                    // MORPH FACTOR: Controls lattice deformation and interference (range 0-1)
                    float morphEffect = u_morphFactor * 2.0; // Double the range for visibility
                    distance = mix(distance, distance * (1.0 + sin(distance * 20.0 + u_time) * 0.3), morphEffect);

                    // CHAOS: Creates moire patterns and turbulence (range 0-1, EXTREMELY dramatic)
                    // Already applied to moire effects above
                    float chaosDistortion = u_chaos * 1.2; // Increased to 1.2x for maximum dramatic effect
                    distance += (sin(currentPos.x * 15.0 + u_time * u_speed) *
                                sin(currentPos.y * 12.0 + u_time * u_speed * 0.8) *
                                sin(currentPos.z * 18.0 + u_time * u_speed * 1.2)) * chaosDistortion;

                    // SCALE: Affects overall lattice size (range 0.1-2.0, very responsive)
                    // Already applied to spacing calculations - creates dramatic size changes

                    // SPEED: Controls all time animations (range 0.1-3.0, immediately visible)
                    // Already applied via u_time * u_speed everywhere

                    // INTENSITY: Controls brightness and layer visibility (range 0-1, dramatic)
                    // Applied in color system below

                    // SATURATION: Controls color saturation (range 0-1, very visible)
                    // Applied in color system below

                    // HUE: Shifts entire color palette (range 0-360, immediate effect)
                    // Applied in color system below

                    if (distance < 0.001) {
                        hitDistance = totalDistance;
                        return distance;
                    }

                    totalDistance += distance * 0.5; // Slower marching for accuracy

                    if (totalDistance > 50.0) break;
                }

                hitDistance = totalDistance;
                return -1.0;
            }

            // Calculate 4D normal for lighting
            vec3 calculate4DNormal(vec3 pos, float epsilon) {
                vec4 pos4d = vec4(pos, sin(u_time * 0.5) * u_scale);
                pos4d = rotate4D(pos4d, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);

                float centerDist = sdf4DHypersphere(pos4d, u_scale); // Use current geometry

                vec3 normal = vec3(
                    sdf4DHypersphere(pos4d + vec4(epsilon, 0, 0, 0), u_scale) - centerDist,
                    sdf4DHypersphere(pos4d + vec4(0, epsilon, 0, 0), u_scale) - centerDist,
                    sdf4DHypersphere(pos4d + vec4(0, 0, epsilon, 0), u_scale) - centerDist
                );

                return normalize(normal);
            }

            // Chromatic dispersion calculation
            vec3 calculateChromaticDispersion(vec3 normal, vec3 rayDir, float wavelength) {
                // Cauchy's equation for refractive index
                float n = u_refractionIndex + u_cauchyCoefficient / (wavelength * wavelength);

                // Snell's law for refraction
                float cosI = -dot(normal, rayDir);
                float sin2T = (1.0 - cosI * cosI) / (n * n);

                if (sin2T > 1.0) {
                    // Total internal reflection
                    return reflect(rayDir, normal);
                } else {
                    float cosT = sqrt(1.0 - sin2T);
                    return normalize(rayDir / n + normal * (cosI / n - cosT));
                }
            }

            // Fresnel reflection calculation
            float calculateFresnel(vec3 normal, vec3 rayDir, float n1, float n2) {
                float cosI = abs(dot(normal, rayDir));
                float n = n1 / n2;
                float sin2T = n * n * (1.0 - cosI * cosI);

                if (sin2T > 1.0) return 1.0; // Total internal reflection

                float cosT = sqrt(1.0 - sin2T);
                float rs = (n1 * cosI - n2 * cosT) / (n1 * cosI + n2 * cosT);
                float rp = (n1 * cosT - n2 * cosI) / (n1 * cosT + n2 * cosI);

                return (rs * rs + rp * rp) * 0.5;
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);

                // DYNAMIC PERSPECTIVE CAMERA SYSTEM for full-screen coverage
                // Camera movement based on 4D rotations and time
                float cameraRadius = 2.0 + 1.5 * sin(u_time * 0.1);
                float cameraTheta = u_time * u_speed * 0.05 + u_rot4dXW * 0.3;
                float cameraPhi = u_time * u_speed * 0.03 + u_rot4dYW * 0.2;
                float cameraW = sin(u_time * 0.08 + u_rot4dZW * 0.4) * 0.5;

                vec3 cameraPos = vec3(
                    cameraRadius * sin(cameraPhi) * cos(cameraTheta),
                    cameraRadius * sin(cameraPhi) * sin(cameraTheta) + cameraW,
                    cameraRadius * cos(cameraPhi)
                );

                // Dynamic FOV and ray direction based on 4D parameters
                float dynamicFOV = 1.0 + 0.3 * sin(u_rot4dXY * 2.0 + u_time * 0.1);
                vec3 rayDir = normalize(vec3(uv * dynamicFOV, -1.0));

                // Apply 4D-influenced camera rotation
                float cameraRotX = u_rot4dXZ * 0.2 + u_time * 0.02;
                float cameraRotY = u_rot4dYZ * 0.15 + u_time * 0.03;

                // Rotate ray direction for dynamic perspective
                float cx = cos(cameraRotX), sx = sin(cameraRotX);
                float cy = cos(cameraRotY), sy = sin(cameraRotY);

                rayDir = vec3(
                    rayDir.x * cy + rayDir.z * sy,
                    rayDir.y * cx - (rayDir.x * sy * sx - rayDir.z * cy * sx),
                    rayDir.y * sx + (rayDir.x * sy * cx - rayDir.z * cy * cx)
                );

                float hitDistance;
                float hit = marchRay4D(cameraPos, rayDir, hitDistance);

                if (hit > 0.0) {
                    vec3 hitPos = cameraPos + rayDir * hitDistance;
                    vec3 normal = calculate4DNormal(hitPos, 0.001);

                    // 5-LAYER LATTICE COLOR SYSTEM - Each layer represents different 4D cross-sections
                    vec3 layer1Color = vec3(0.3, 0.7, 1.0);      // Primary lattice - bright blue
                    vec3 layer2Color = vec3(1.0, 0.5, 0.2);      // Secondary lattice - warm orange
                    vec3 layer3Color = vec3(0.8, 0.9, 0.3);      // Tertiary lattice - bright yellow-green
                    vec3 layer4Color = vec3(0.9, 0.2, 0.7);      // Quaternary lattice - magenta
                    vec3 layer5Color = vec3(0.4, 0.9, 0.9);      // Quintessential lattice - cyan
                    vec3 intersectionColor = vec3(1.0, 1.0, 1.0); // Lattice intersections - white
                    vec3 fieldColor = vec3(0.05, 0.1, 0.2);      // Background field - dark blue

                    // Apply user hue shift to entire palette
                    float hueShift = u_hue / 360.0 * 6.28318;
                    float c = cos(hueShift), s = sin(hueShift);
                    mat3 hueMatrix = mat3(
                        vec3(0.299 + 0.701*c + 0.168*s, 0.587 - 0.587*c + 0.330*s, 0.114 - 0.114*c - 0.497*s),
                        vec3(0.299 - 0.299*c - 0.328*s, 0.587 + 0.413*c + 0.035*s, 0.114 - 0.114*c + 0.292*s),
                        vec3(0.299 - 0.300*c + 1.250*s, 0.587 - 0.588*c - 1.050*s, 0.114 + 0.886*c - 0.203*s)
                    );

                    layer1Color = hueMatrix * layer1Color;
                    layer2Color = hueMatrix * layer2Color;
                    layer3Color = hueMatrix * layer3Color;
                    layer4Color = hueMatrix * layer4Color;
                    layer5Color = hueMatrix * layer5Color;
                    intersectionColor = hueMatrix * intersectionColor;
                    fieldColor = hueMatrix * fieldColor;

                    // LATTICE LAYER ANALYSIS - Determine which layers are visible
                    // Recreate lattice calculations to determine layer contribution
                    vec4 colorPos4d = vec4(hitPos, sin(u_time * 0.3) * u_scale);
                    colorPos4d = rotate4D(colorPos4d, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);

                    // Layer proximity analysis
                    vec4 pos4d_layer1 = vec4(hitPos, u_time * u_speed * 0.1);
                    pos4d_layer1 = rotate4D(pos4d_layer1, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);
                    vec3 lattice3d_1 = project4Dto3D(pos4d_layer1, 2.0 + sin(u_time * 0.1));
                    float spacing1 = u_scale * (1.0 + 0.3 * sin(u_rot4dXW + u_time * 0.05));
                    vec3 grid1 = mod(lattice3d_1, spacing1) - spacing1 * 0.5;
                    float layer1Distance = length(max(abs(grid1) - vec3(0.02 * u_scale), 0.0));

                    vec4 pos4d_layer2 = vec4(hitPos, u_time * u_speed * 0.15 + 1.57);
                    pos4d_layer2 = rotate4D(pos4d_layer2,
                        u_rot4dXW + 0.5, u_rot4dYW + 0.3, u_rot4dZW + 0.7,
                        u_rot4dXY + 0.2, u_rot4dXZ + 0.8, u_rot4dYZ + 0.4);
                    vec3 lattice3d_2 = project4Dto3D(pos4d_layer2, 1.5 + cos(u_time * 0.08));
                    float spacing2 = u_scale * (0.8 + 0.2 * cos(u_rot4dYW + u_time * 0.07));
                    vec3 grid2 = mod(lattice3d_2, spacing2) - spacing2 * 0.5;
                    float layer2Distance = length(max(abs(grid2) - vec3(0.015 * u_scale), 0.0));

                    vec4 pos4d_layer3 = vec4(hitPos, u_time * u_speed * 0.08 + 3.14);
                    pos4d_layer3 = rotate4D(pos4d_layer3,
                        u_rot4dXW + 1.0, u_rot4dYW + 0.6, u_rot4dZW + 0.2,
                        u_rot4dXY + 1.2, u_rot4dXZ + 0.4, u_rot4dYZ + 0.9);
                    vec3 lattice3d_3 = project4Dto3D(pos4d_layer3, 3.0 + sin(u_time * 0.06) * 0.5);
                    float spacing3 = u_scale * (1.2 + 0.4 * sin(u_rot4dZW + u_time * 0.04));
                    vec3 grid3 = mod(lattice3d_3, spacing3) - spacing3 * 0.5;
                    float layer3Distance = length(max(abs(grid3) - vec3(0.025 * u_scale), 0.0));

                    // Layer 4 calculation for color
                    vec4 pos4d_layer4_color = vec4(hitPos, u_time * u_speed * 0.12 + 4.71);
                    pos4d_layer4_color = rotate4D(pos4d_layer4_color,
                        u_rot4dXW + 1.5, u_rot4dYW + 0.9, u_rot4dZW + 0.4,
                        u_rot4dXY + 0.7, u_rot4dXZ + 1.1, u_rot4dYZ + 0.3);
                    vec3 lattice3d_4_color = project4Dto3D(pos4d_layer4_color, 2.5 + cos(u_time * 0.09) * 0.3);
                    float spacing4_color = u_scale * (0.9 + 0.3 * cos(u_rot4dXY + u_time * 0.06));
                    vec3 grid4 = mod(lattice3d_4_color, spacing4_color) - spacing4_color * 0.5;
                    float layer4Distance = length(max(abs(grid4) - vec3(0.018 * u_scale), 0.0));

                    // Layer 5 calculation for color
                    vec4 pos4d_layer5_color = vec4(hitPos, u_time * u_speed * 0.18 + 6.28);
                    pos4d_layer5_color = rotate4D(pos4d_layer5_color,
                        u_rot4dXW + 2.0, u_rot4dYW + 1.2, u_rot4dZW + 0.8,
                        u_rot4dXY + 1.6, u_rot4dXZ + 0.5, u_rot4dYZ + 1.4);
                    vec3 lattice3d_5_color = project4Dto3D(pos4d_layer5_color, 1.8 + sin(u_time * 0.11) * 0.4);
                    float spacing5_color = u_scale * (1.4 + 0.5 * sin(u_rot4dXZ + u_time * 0.03));
                    vec3 grid5 = mod(lattice3d_5_color, spacing5_color) - spacing5_color * 0.5;
                    float layer5Distance = length(max(abs(grid5) - vec3(0.022 * u_scale), 0.0));

                    // DRAMATICALLY VISIBLE 5-LAYER COLOR SYSTEM
                    vec3 finalColor = fieldColor; // Start with background field

                    // MUCH LARGER THRESHOLD for layer visibility
                    float threshold = 0.3 * u_scale; // Tripled threshold for visibility

                    // LAYER 1 - BRIGHT BLUE (much more visible)
                    if (layer1Distance < threshold) {
                        float layer1Strength = 1.0 - (layer1Distance / threshold);
                        finalColor = mix(finalColor, layer1Color, layer1Strength * u_intensity * 2.0); // Double intensity
                    }

                    // LAYER 2 - WARM ORANGE (much more visible)
                    if (layer2Distance < threshold) {
                        float layer2Strength = 1.0 - (layer2Distance / threshold);
                        finalColor = mix(finalColor, layer2Color, layer2Strength * u_intensity * 2.0);
                    }

                    // LAYER 3 - YELLOW-GREEN (much more visible)
                    if (layer3Distance < threshold) {
                        float layer3Strength = 1.0 - (layer3Distance / threshold);
                        finalColor = mix(finalColor, layer3Color, layer3Strength * u_intensity * 2.0);
                    }

                    // LAYER 4 - MAGENTA (much more visible)
                    if (layer4Distance < threshold) {
                        float layer4Strength = 1.0 - (layer4Distance / threshold);
                        finalColor = mix(finalColor, layer4Color, layer4Strength * u_intensity * 2.0);
                    }

                    // LAYER 5 - CYAN (much more visible)
                    if (layer5Distance < threshold) {
                        float layer5Strength = 1.0 - (layer5Distance / threshold);
                        finalColor = mix(finalColor, layer5Color, layer5Strength * u_intensity * 2.0);
                    }

                    // DRAMATIC 5-LAYER INTERSECTION HIGHLIGHTING
                    float intersectionProximity = 0.0;
                    if (layer1Distance < threshold && layer2Distance < threshold) intersectionProximity += 0.5; // Increased from 0.2
                    if (layer1Distance < threshold && layer3Distance < threshold) intersectionProximity += 0.5;
                    if (layer1Distance < threshold && layer4Distance < threshold) intersectionProximity += 0.5;
                    if (layer1Distance < threshold && layer5Distance < threshold) intersectionProximity += 0.5;
                    if (layer2Distance < threshold && layer3Distance < threshold) intersectionProximity += 0.5;
                    if (layer2Distance < threshold && layer4Distance < threshold) intersectionProximity += 0.5;
                    if (layer2Distance < threshold && layer5Distance < threshold) intersectionProximity += 0.5;
                    if (layer3Distance < threshold && layer4Distance < threshold) intersectionProximity += 0.5;
                    if (layer3Distance < threshold && layer5Distance < threshold) intersectionProximity += 0.5;
                    if (layer4Distance < threshold && layer5Distance < threshold) intersectionProximity += 0.5;

                    // BRIGHT WHITE INTERSECTIONS - Very visible
                    if (intersectionProximity > 0.0) {
                        finalColor = mix(finalColor, intersectionColor, intersectionProximity * u_intensity * 2.0); // Double intensity
                    }

                    // Apply user saturation control (more dramatic)
                    finalColor = mix(vec3(dot(finalColor, vec3(0.299, 0.587, 0.114))), finalColor, u_saturation * 1.5);

                    // ENHANCED SHADER EFFECTS

                    // Dramatic particle effect simulation
                    float particleFlow = 0.0;
                    if (intersectionProximity > 0.0) {
                        vec3 flowDir = normalize(cross(lattice3d_1, lattice3d_2 + lattice3d_3));
                        float flowPhase = dot(hitPos, flowDir) * 3.0 + u_time * u_speed * 5.0; // Increased frequency
                        particleFlow = sin(flowPhase) * cos(flowPhase * 0.7) * 0.5 * u_intensity; // Increased amplitude
                        finalColor += intersectionColor * particleFlow * u_chaos * 2.0; // Double chaos effect
                    }

                    // More visible holographic shimmer
                    vec4 viewAngle4d = vec4(normalize(rayDir), sin(u_time * 0.2));
                    viewAngle4d = rotate4D(viewAngle4d, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);
                    float shimmer = sin(viewAngle4d.w * 15.0 + u_time * 3.0) * 0.2 * u_morphFactor; // Increased effect
                    finalColor += vec3(shimmer);

                    // Stronger energy field visualization
                    vec4 energyPos = vec4(hitPos * 0.3, u_time * u_speed * 0.05);
                    energyPos = rotate4D(energyPos, u_rot4dXW, u_rot4dYW, u_rot4dZW, u_rot4dXY, u_rot4dXZ, u_rot4dYZ);
                    float energyField = sin(energyPos.x * 5.0) * sin(energyPos.y * 5.0) * sin(energyPos.z * 5.0) * sin(energyPos.w * 5.0);
                    energyField = smoothstep(-0.3, 0.3, energyField) * 0.4 * u_gridDensity; // Double effect
                    finalColor = mix(finalColor, finalColor + vec3(0.2, 0.3, 0.4), energyField);

                    // Much more dramatic intensity effect
                    finalColor *= (0.5 + u_intensity * 2.0); // Increased from (0.3 + u_intensity * 1.0)

                    // Fresnel reflection for depth and dimensionality
                    float fresnel = calculateFresnel(normal, rayDir, 1.0, u_refractionIndex);
                    fresnel = pow(fresnel, u_fresnelPower);

                    // Subsurface scattering approximation
                    float subsurface = pow(max(0.0, dot(-rayDir, normal)), u_subsurfaceScattering);
                    finalColor += u_layerColor * subsurface * u_materialDensity;

                    // Caustic effect based on surface curvature
                    float curvature = length(calculate4DNormal(hitPos + normal * 0.01, 0.001) - normal);
                    float caustic = pow(curvature * 10.0, 2.0) * u_causticIntensity;
                    finalColor += vec3(caustic);

                    // Layer-specific effects based on role
                    float layerEffect = 1.0;
                    vec3 envColor = finalColor;

                    // Environmental effects and vignette
                    float vignette = 1.0 - length(uv) * 0.3;
                    envColor = mix(envColor, u_layerColor, 0.1);

                    ${isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(envColor * vignette, layerEffect * 0.8);
                } else {
                    // Background with sophisticated gradient
                    vec3 bgColor = mix(
                        vec3(0.1, 0.05, 0.2) * u_layerColor,
                        vec3(0.05, 0.1, 0.3) * u_layerColor,
                        smoothstep(-1.0, 1.0, uv.y)
                    );

                    // Add environmental lighting
                    bgColor += vec3(0.02, 0.04, 0.08) * u_intensity;

                    ${isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(bgColor, 0.3);
                }

                // Apply material properties
                vec3 finalColor = ${isWebGL2 ? 'fragColor' : 'gl_FragColor'}.rgb;

                // Surface roughness effect
                float roughness = u_surfaceRoughness;
                finalColor = mix(finalColor, finalColor * 0.8, roughness);

                // Distance attenuation
                float attenuation = exp(-hitDistance * 0.1);
                finalColor *= attenuation;

                // Final alpha based on layer and material properties
                float alpha = u_layerOpacity * attenuation * (0.7 + u_intensity * 0.3);

                // Ensure colors are visible and properly calibrated
                finalColor = clamp(finalColor, 0.0, 2.0);

                ${isWebGL2 ? 'fragColor' : 'gl_FragColor'} = vec4(finalColor, alpha);
            }
        `;
        }

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
            u_refractionIndex: this.gl.getUniformLocation(this.program, 'u_refractionIndex'),
            u_dispersionStrength: this.gl.getUniformLocation(this.program, 'u_dispersionStrength'),
            u_projectionDistance: this.gl.getUniformLocation(this.program, 'u_projectionDistance'),

            // Advanced optics
            u_wavelengthRange: this.gl.getUniformLocation(this.program, 'u_wavelengthRange'),
            u_cauchyCoefficient: this.gl.getUniformLocation(this.program, 'u_cauchyCoefficient'),
            u_subsurfaceScattering: this.gl.getUniformLocation(this.program, 'u_subsurfaceScattering'),
            u_fresnelPower: this.gl.getUniformLocation(this.program, 'u_fresnelPower'),
            u_causticIntensity: this.gl.getUniformLocation(this.program, 'u_causticIntensity'),
            u_materialDensity: this.gl.getUniformLocation(this.program, 'u_materialDensity'),
            u_surfaceRoughness: this.gl.getUniformLocation(this.program, 'u_surfaceRoughness'),

            // Ray marching
            u_marchingSteps: this.gl.getUniformLocation(this.program, 'u_marchingSteps'),
            u_marchingPrecision: this.gl.getUniformLocation(this.program, 'u_marchingPrecision'),
            u_maxDistance: this.gl.getUniformLocation(this.program, 'u_maxDistance')
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

        // Standard parameters
        this.gl.uniform1f(this.uniforms.u_gridDensity, parameters.gridDensity || 15);
        this.gl.uniform1f(this.uniforms.u_morphFactor, parameters.morphFactor || 0.5);
        this.gl.uniform1f(this.uniforms.u_chaos, parameters.chaos || 0.2);
        this.gl.uniform1f(this.uniforms.u_speed, parameters.speed || 1.0);
        this.gl.uniform1f(this.uniforms.u_hue, parameters.hue || 200);
        this.gl.uniform1f(this.uniforms.u_intensity, parameters.intensity || 0.9);
        this.gl.uniform1f(this.uniforms.u_saturation, parameters.saturation || 0.6);
        this.gl.uniform1f(this.uniforms.u_scale, parameters.scale || 1.0);

        // Layer-specific parameters
        const layerConfig = this.getLayerConfig();
        this.gl.uniform3fv(this.uniforms.u_layerColor, layerConfig.color);
        this.gl.uniform1f(this.uniforms.u_layerScale, layerConfig.scale);
        this.gl.uniform1f(this.uniforms.u_layerOpacity, layerConfig.opacity);
        this.gl.uniform1f(this.uniforms.u_refractionIndex, layerConfig.refractionIndex);
        this.gl.uniform1f(this.uniforms.u_dispersionStrength, layerConfig.dispersionStrength);
        this.gl.uniform1f(this.uniforms.u_projectionDistance, layerConfig.projectionDistance);

        // Advanced parameters
        this.gl.uniform1f(this.uniforms.u_wavelengthRange, parameters.wavelengthRange || 300.0);
        this.gl.uniform1f(this.uniforms.u_cauchyCoefficient, parameters.cauchyCoefficient || 0.01);
        this.gl.uniform1f(this.uniforms.u_subsurfaceScattering, parameters.subsurfaceScattering || 0.3);
        this.gl.uniform1f(this.uniforms.u_fresnelPower, parameters.fresnelPower || 2.0);
        this.gl.uniform1f(this.uniforms.u_causticIntensity, parameters.causticIntensity || 0.5);
        this.gl.uniform1f(this.uniforms.u_materialDensity, parameters.materialDensity || 0.8);
        this.gl.uniform1f(this.uniforms.u_surfaceRoughness, parameters.surfaceRoughness || 0.1);

        // Ray marching parameters
        this.gl.uniform1f(this.uniforms.u_marchingSteps, parameters.marchingSteps || 64.0);
        this.gl.uniform1f(this.uniforms.u_marchingPrecision, parameters.marchingPrecision || 0.001);
        this.gl.uniform1f(this.uniforms.u_maxDistance, parameters.maxDistance || 20.0);

        // Clear and render
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    getLayerConfig() {
        // Sophisticated layer configurations for prismatic effects
        switch (this.role) {
            case 'background':
                return {
                    color: [0.05, 0.1, 0.2],
                    scale: 0.7,
                    opacity: 0.3,
                    refractionIndex: 1.4,
                    dispersionStrength: 0.3,
                    projectionDistance: 4.0
                };
            case 'shadow':
                return {
                    color: [0.15, 0.1, 0.3],
                    scale: 0.85,
                    opacity: 0.4,
                    refractionIndex: 1.45,
                    dispersionStrength: 0.5,
                    projectionDistance: 3.5
                };
            case 'content':
                return {
                    color: [1.0, 1.0, 1.0],
                    scale: 1.0,
                    opacity: 0.8,
                    refractionIndex: 1.5,
                    dispersionStrength: 0.7,
                    projectionDistance: 3.0
                };
            case 'highlight':
                return {
                    color: [1.3, 1.2, 0.9],
                    scale: 1.1,
                    opacity: 0.6,
                    refractionIndex: 1.55,
                    dispersionStrength: 0.9,
                    projectionDistance: 2.5
                };
            case 'accent':
                return {
                    color: [1.5, 1.0, 1.4],
                    scale: 1.2,
                    opacity: 0.5,
                    refractionIndex: 1.6,
                    dispersionStrength: 1.2,
                    projectionDistance: 2.0
                };
            default:
                return {
                    color: [1.0, 1.0, 1.0],
                    scale: 1.0,
                    opacity: 0.7,
                    refractionIndex: 1.5,
                    dispersionStrength: 0.7,
                    projectionDistance: 3.0
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
 * PrismaticSystem - Main system controller for chromatic dispersion
 */
export class PrismaticSystem {
    constructor() {
        this.name = 'prismatic';
        this.isActive = false;
        this.isInitialized = false;

        // 5-layer canvas architecture
        this.canvasIds = [
            'prismatic-background-canvas',
            'prismatic-shadow-canvas',
            'prismatic-content-canvas',
            'prismatic-highlight-canvas',
            'prismatic-accent-canvas'
        ];

        this.visualizers = [];
        this.parameters = new Map();

        // Advanced 4D polytope selection
        this.polytopes = [
            'Hypersphere', 'Hypercube', '5-Cell (Simplex)',
            '16-Cell (Cross)', '24-Cell', '120-Cell',
            '600-Cell', 'Hypertorus', 'Klein Bottle', 'Morphing Complex'
        ];

        console.log('🔮 PrismaticSystem: Initialized with hyperdimensional chromatic dispersion');
    }

    async initialize() {
        console.log('🔮 PrismaticSystem: Starting initialization with advanced optics');

        try {
            this.setupPolytopes();
            this.initializeParameters();

            this.isInitialized = true;
            console.log('✅ PrismaticSystem: Initialization complete with 4D ray-marching');
            return true;
        } catch (error) {
            console.error('❌ PrismaticSystem: Initialization failed:', error);
            return false;
        }
    }

    async activate() {
        console.log('🔮 PrismaticSystem: Activating with 5-layer chromatic architecture');

        try {
            if (!this.engine) {
                await this.createEngine();
            }

            this.showCanvasLayers();

            if (this.engine) {
                this.engine.isActive = true;

                if (this.engine.startRenderLoop) {
                    this.engine.startRenderLoop();
                }

                if (this.engine.visualizers) {
                    this.engine.visualizers.forEach(visualizer => {
                        if (visualizer && visualizer.gl) {
                            visualizer.setActive(true);
                        }
                    });
                }

                window.prismaticEngine = this.engine;
            }

            this.isActive = true;
            console.log('✅ PrismaticSystem: Activated with advanced 4D polytope mathematics');
            return true;

        } catch (error) {
            console.error('❌ PrismaticSystem: Activation failed:', error);
            return false;
        }
    }

    async createEngine() {
        console.log('🔮 Creating PrismaticEngine with 5-layer chromatic architecture');

        const layerRoles = ['background', 'shadow', 'content', 'highlight', 'accent'];

        for (let i = 0; i < this.canvasIds.length; i++) {
            const visualizer = new PrismaticVisualizer(
                this.canvasIds[i],
                layerRoles[i],
                { layer: i }
            );

            if (visualizer.initialize()) {
                this.visualizers.push(visualizer);
                console.log(`✅ Layer ${i} (${layerRoles[i]}) initialized with chromatic dispersion`);
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

        console.log('✅ PrismaticEngine created with', this.visualizers.length, 'chromatic layers');
    }

    startRenderLoop() {
        const render = (time) => {
            if (!this.isActive) return;

            const timeInSeconds = time * 0.001;

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

            // Advanced chromatic parameters
            wavelengthRange: this.parameters.get('wavelengthRange') || 300.0,
            cauchyCoefficient: this.parameters.get('cauchyCoefficient') || 0.01,
            subsurfaceScattering: this.parameters.get('subsurfaceScattering') || 0.3,
            fresnelPower: this.parameters.get('fresnelPower') || 2.0,
            causticIntensity: this.parameters.get('causticIntensity') || 0.5,
            materialDensity: this.parameters.get('materialDensity') || 0.8,
            surfaceRoughness: this.parameters.get('surfaceRoughness') || 0.1,

            // Ray marching parameters
            marchingSteps: this.parameters.get('marchingSteps') || 64.0,
            marchingPrecision: this.parameters.get('marchingPrecision') || 0.001,
            maxDistance: this.parameters.get('maxDistance') || 20.0
        };
    }

    setupPolytopes() {
        console.log('🔮 Setting up 4D polytope selection with', this.polytopes.length, 'options');
    }

    initializeParameters() {
        console.log('🔮 Initializing advanced chromatic dispersion parameters');
    }

    showCanvasLayers() {
        const container = document.getElementById('prismaticLayers');
        if (container) {
            container.style.display = 'block';
        }
    }

    updateParameter(name, value) {
        this.parameters.set(name, value);
        // Reduce logging spam - only log major changes
        if (!this.lastLoggedValues) this.lastLoggedValues = {};
        if (Math.abs((this.lastLoggedValues[name] || 0) - value) > 0.1) {
            console.log(`🔮 Updated parameter ${name} = ${value.toFixed(2)}`);
            this.lastLoggedValues[name] = value;
        }
    }

    deactivate() {
        console.log('🔮 PrismaticSystem: Deactivating');

        this.isActive = false;

        if (this.engine) {
            this.engine.isActive = false;
            this.visualizers.forEach(v => v.setActive(false));
        }

        const container = document.getElementById('prismaticLayers');
        if (container) {
            container.style.display = 'none';
        }
    }

    dispose() {
        console.log('🔮 PrismaticSystem: Disposing chromatic resources');

        this.visualizers.forEach(v => v.dispose());
        this.visualizers = [];
        this.engine = null;
        this.isInitialized = false;
    }
}