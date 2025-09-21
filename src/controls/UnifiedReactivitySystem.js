/**
 * VIB34D Unified Reactivity System
 * ULTRA-COMPREHENSIVE: Coordinates ALL visual parameters with intelligent relationships
 *
 * COMPLEMENTARY & INVERSE REACTIONS:
 * - Audio bass increases -> Rotations XW/YW + Scale UP, Grid Density DOWN (inverse)
 * - Touch velocity -> Chaos UP + Intensity UP, Saturation DOWN (complementary/inverse)
 * - Gyroscope tilt -> Morph Factor + Hue shift, Speed DOWN (shared/inverse)
 * - Pinch gesture -> Scale + Grid Density (shared), Chaos DOWN (inverse)
 *
 * ULTRA-INTELLIGENT PARAMETER RELATIONSHIPS:
 * - When one parameter peaks, others respond in harmony or opposition
 * - Natural breathing/pulsing effects through parameter coupling
 * - Musical harmony detection affects color relationships
 * - Gesture recognition triggers parameter cascades
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * Join The Exoditical Moral Architecture Movement: Parserator.com
 * "The Revolution Will Not be in a Structured Format"
 *
 * © 2025 Paul Phillips - Clear Seas Solutions LLC - All Rights Reserved
 */

export class UnifiedReactivitySystem {
    constructor() {
        this.isActive = false;

        // ALL VISUAL PARAMETERS with intelligent relationships
        this.parameters = {
            // 6D Rotations (primary from other systems)
            rot4dXW: { value: 0, base: 0, reactive: 0, smoothed: 0 },
            rot4dYW: { value: 0, base: 0, reactive: 0, smoothed: 0 },
            rot4dZW: { value: 0, base: 0, reactive: 0, smoothed: 0 },
            rot4dXY: { value: 0, base: 0, reactive: 0, smoothed: 0 },
            rot4dXZ: { value: 0, base: 0, reactive: 0, smoothed: 0 },
            rot4dYZ: { value: 0, base: 0, reactive: 0, smoothed: 0 },

            // Core Visual Parameters
            geometry: { value: 0, base: 0, reactive: 0, smoothed: 0 },
            gridDensity: { value: 15, base: 15, reactive: 0, smoothed: 15 },
            morphFactor: { value: 0.5, base: 0.5, reactive: 0, smoothed: 0.5 },
            chaos: { value: 0.2, base: 0.2, reactive: 0, smoothed: 0.2 },
            speed: { value: 1.0, base: 1.0, reactive: 0, smoothed: 1.0 },
            scale: { value: 1.0, base: 1.0, reactive: 0, smoothed: 1.0 },

            // Color Parameters
            hue: { value: 200, base: 200, reactive: 0, smoothed: 200 },
            intensity: { value: 0.9, base: 0.9, reactive: 0, smoothed: 0.9 },
            saturation: { value: 0.6, base: 0.6, reactive: 0, smoothed: 0.6 }
        };

        // ULTRA-INTELLIGENT PARAMETER RELATIONSHIPS
        this.relationships = {
            // AUDIO BASS -> Multiple parameter effects
            audioBass: {
                positive: ['rot4dXW', 'rot4dYW', 'scale', 'intensity'],  // Increase with bass
                negative: ['gridDensity', 'saturation', 'speed'],         // Decrease with bass (inverse)
                multipliers: { rot4dXW: 2.0, rot4dYW: 1.5, scale: 0.5, intensity: 0.3, gridDensity: -0.3, saturation: -0.2, speed: -0.2 }
            },

            // AUDIO MID -> Morph and chaos effects
            audioMid: {
                positive: ['morphFactor', 'chaos', 'rot4dZW', 'rot4dXY'],
                negative: ['gridDensity'],
                multipliers: { morphFactor: 1.0, chaos: 0.8, rot4dZW: 1.2, rot4dXY: 1.0, gridDensity: -0.2 }
            },

            // AUDIO HIGH -> Color and fine details
            audioHigh: {
                positive: ['hue', 'rot4dXZ', 'rot4dYZ', 'speed'],
                negative: ['scale', 'morphFactor'],
                multipliers: { hue: 50, rot4dXZ: 0.8, rot4dYZ: 0.8, speed: 0.4, scale: -0.2, morphFactor: -0.3 }
            },

            // TOUCH VELOCITY -> Chaos and energy
            touchVelocity: {
                positive: ['chaos', 'intensity', 'speed'],
                negative: ['saturation', 'gridDensity'],
                multipliers: { chaos: 0.6, intensity: 0.4, speed: 0.3, saturation: -0.3, gridDensity: -0.4 }
            },

            // GYROSCOPE TILT -> Spatial transformations
            gyroscopeTilt: {
                positive: ['morphFactor', 'hue', 'scale'],
                negative: ['speed', 'chaos'],
                multipliers: { morphFactor: 0.8, hue: 30, scale: 0.3, speed: -0.2, chaos: -0.2 }
            },

            // PINCH GESTURE -> Scale and detail
            pinchGesture: {
                positive: ['scale', 'gridDensity', 'intensity'],
                negative: ['chaos', 'speed'],
                multipliers: { scale: 1.0, gridDensity: 0.5, intensity: 0.3, chaos: -0.4, speed: -0.3 }
            },

            // BEAT DETECTION -> Synchronized bursts
            beatDetected: {
                positive: ['intensity', 'chaos', 'speed', 'scale'],
                negative: ['saturation'],
                multipliers: { intensity: 0.8, chaos: 0.6, speed: 0.5, scale: 0.4, saturation: -0.2 }
            },

            // HARMONIC RESONANCE -> Color harmony
            harmonicResonance: {
                positive: ['hue', 'saturation', 'intensity'],
                negative: ['chaos'],
                multipliers: { hue: 20, saturation: 0.3, intensity: 0.2, chaos: -0.3 }
            }
        };

        // BREATHING PATTERNS - Natural parameter oscillations
        this.breathingPatterns = {
            enabled: true,
            cycles: {
                slow: { period: 8000, amplitude: 0.1, params: ['intensity', 'saturation'] },
                medium: { period: 4000, amplitude: 0.05, params: ['morphFactor', 'scale'] },
                fast: { period: 2000, amplitude: 0.03, params: ['hue', 'chaos'] }
            }
        };

        // Input sources
        this.inputSources = {
            audio: null,
            touch: null,
            gyroscope: null
        };

        // Smoothing factors for each parameter type
        this.smoothingFactors = {
            rotations: 0.15,
            core: 0.08,
            color: 0.12,
            advanced: 0.10
        };

        this.updateCallback = null;
        this.lastUpdateTime = Date.now();

        console.log('🌊 UnifiedReactivitySystem: Comprehensive parameter coordination initialized');
        console.log('🌊 Relationships configured for complementary & inverse reactions');
    }

    /**
     * Initialize with input systems
     */
    initialize(audioSystem, touchSystem, gyroscopeSystem) {
        this.inputSources.audio = audioSystem;
        this.inputSources.touch = touchSystem;
        this.inputSources.gyroscope = gyroscopeSystem;

        console.log('✅ UnifiedReactivitySystem: Connected to all input sources');
        return true;
    }

    /**
     * Start unified reactivity processing
     */
    start(updateCallback) {
        this.isActive = true;
        this.updateCallback = updateCallback;

        // Start processing loop
        this.processReactivity();

        console.log('🌊 UnifiedReactivitySystem: Unified parameter reactivity started');
    }

    /**
     * Stop reactivity processing
     */
    stop() {
        this.isActive = false;
        this.updateCallback = null;

        console.log('🌊 UnifiedReactivitySystem: Reactivity processing stopped');
    }

    /**
     * Main reactivity processing loop
     */
    processReactivity() {
        if (!this.isActive) return;

        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastUpdateTime;

        // Reset reactive values
        Object.keys(this.parameters).forEach(param => {
            this.parameters[param].reactive = 0;
        });

        // Process all input sources
        this.processAudioReactivity();
        this.processTouchReactivity();
        this.processGyroscopeReactivity();

        // Apply breathing patterns
        this.applyBreathingPatterns(currentTime);

        // Apply parameter relationships and smoothing
        this.applyParameterRelationships();
        this.smoothParameters();

        // Send updates
        if (this.updateCallback) {
            const finalParameters = {};
            Object.keys(this.parameters).forEach(param => {
                finalParameters[param] = this.parameters[param].smoothed;
            });
            this.updateCallback(finalParameters);
        }

        this.lastUpdateTime = currentTime;

        // Continue processing
        requestAnimationFrame(() => this.processReactivity());
    }

    /**
     * Process audio input with intelligent parameter mapping
     */
    processAudioReactivity() {
        if (!this.inputSources.audio || !this.inputSources.audio.getAudioLevels) return;

        const audioLevels = this.inputSources.audio.getAudioLevels();
        if (!audioLevels) return;

        // BASS -> Scale, rotations UP; Grid density, saturation DOWN
        this.applyRelationship('audioBass', audioLevels.bass);

        // MID -> Morph, chaos, spatial rotations
        this.applyRelationship('audioMid', audioLevels.mid);

        // HIGH -> Color changes, detail rotations
        this.applyRelationship('audioHigh', audioLevels.high);

        // Beat detection -> Synchronized bursts
        if (audioLevels.beatDetected) {
            this.applyRelationship('beatDetected', 1.0);
        }

        // Harmonic resonance -> Color harmony
        if (audioLevels.harmonicResonance) {
            this.applyRelationship('harmonicResonance', audioLevels.harmonicResonance);
        }

        // Copy audio rotations to our system
        if (audioLevels.rotations) {
            Object.keys(audioLevels.rotations).forEach(axis => {
                if (this.parameters[axis]) {
                    this.parameters[axis].reactive += audioLevels.rotations[axis];
                }
            });
        }
    }

    /**
     * Process touch input with velocity-based effects
     */
    processTouchReactivity() {
        if (!this.inputSources.touch) return;

        const controlState = this.inputSources.touch.getControlState();
        if (!controlState) return;

        // Calculate touch velocity
        const touchVelocity = Math.sqrt(
            controlState.touchVelocity?.x ** 2 + controlState.touchVelocity?.y ** 2 || 0
        ) * 0.01;

        // Touch velocity -> Chaos, intensity UP; Saturation, grid DOWN
        this.applyRelationship('touchVelocity', touchVelocity);

        // Pinch gesture -> Scale and detail effects
        if (controlState.pinchActive) {
            this.applyRelationship('pinchGesture', 1.0);
        }

        // Copy touch rotations
        if (controlState.rotations) {
            Object.keys(controlState.rotations).forEach(axis => {
                if (this.parameters[axis]) {
                    this.parameters[axis].reactive += controlState.rotations[axis];
                }
            });
        }
    }

    /**
     * Process gyroscope input with tilt-based transformations
     */
    processGyroscopeReactivity() {
        if (!this.inputSources.gyroscope) return;

        const controlState = this.inputSources.gyroscope.getControlState();
        if (!controlState) return;

        // Calculate total gyroscope tilt
        const gyroTilt = Math.sqrt(
            (controlState.gyroState?.deltaBeta ** 2 || 0) +
            (controlState.gyroState?.deltaGamma ** 2 || 0)
        ) * 0.1;

        // Gyro tilt -> Morph, hue, scale UP; Speed, chaos DOWN
        this.applyRelationship('gyroscopeTilt', gyroTilt);

        // Copy gyroscope rotations
        if (controlState.rotations) {
            Object.keys(controlState.rotations).forEach(axis => {
                if (this.parameters[axis]) {
                    this.parameters[axis].reactive += controlState.rotations[axis];
                }
            });
        }
    }

    /**
     * Apply parameter relationship
     */
    applyRelationship(relationshipName, intensity) {
        const relationship = this.relationships[relationshipName];
        if (!relationship) return;

        // Apply positive relationships
        relationship.positive.forEach(param => {
            const multiplier = relationship.multipliers[param] || 1.0;
            this.parameters[param].reactive += intensity * multiplier;
        });

        // Apply negative (inverse) relationships
        relationship.negative.forEach(param => {
            const multiplier = Math.abs(relationship.multipliers[param]) || 1.0;
            this.parameters[param].reactive -= intensity * multiplier;
        });
    }

    /**
     * Apply natural breathing patterns
     */
    applyBreathingPatterns(currentTime) {
        if (!this.breathingPatterns.enabled) return;

        Object.values(this.breathingPatterns.cycles).forEach(cycle => {
            const phase = (currentTime % cycle.period) / cycle.period * 2 * Math.PI;
            const oscillation = Math.sin(phase) * cycle.amplitude;

            cycle.params.forEach(param => {
                if (this.parameters[param]) {
                    this.parameters[param].reactive += oscillation;
                }
            });
        });
    }

    /**
     * Apply parameter relationships and calculate final values
     */
    applyParameterRelationships() {
        Object.keys(this.parameters).forEach(param => {
            const p = this.parameters[param];

            // Combine base value with reactive changes
            p.value = p.base + p.reactive;

            // Apply parameter-specific constraints
            p.value = this.constrainParameter(param, p.value);
        });
    }

    /**
     * Constrain parameters to valid ranges
     */
    constrainParameter(param, value) {
        const constraints = {
            geometry: { min: 0, max: 9 },
            gridDensity: { min: 1, max: 64 },
            morphFactor: { min: 0, max: 2 },
            chaos: { min: 0, max: 1 },
            speed: { min: 0.1, max: 3 },
            scale: { min: 0.25, max: 3 },
            hue: { min: 0, max: 360, wrap: true },
            intensity: { min: 0, max: 2 },
            saturation: { min: 0, max: 1 }
        };

        const constraint = constraints[param];
        if (!constraint) return value; // No constraints for rotations

        if (constraint.wrap) {
            // Wrap around for hue
            while (value < constraint.min) value += (constraint.max - constraint.min);
            while (value > constraint.max) value -= (constraint.max - constraint.min);
        } else {
            // Clamp to range
            value = Math.max(constraint.min, Math.min(constraint.max, value));
        }

        return value;
    }

    /**
     * Apply smoothing to all parameters
     */
    smoothParameters() {
        Object.keys(this.parameters).forEach(param => {
            const p = this.parameters[param];

            // Determine smoothing factor based on parameter type
            let smoothingFactor;
            if (param.startsWith('rot4d')) {
                smoothingFactor = this.smoothingFactors.rotations;
            } else if (['hue', 'intensity', 'saturation'].includes(param)) {
                smoothingFactor = this.smoothingFactors.color;
            } else if (['geometry', 'gridDensity', 'morphFactor', 'chaos', 'speed', 'scale'].includes(param)) {
                smoothingFactor = this.smoothingFactors.core;
            } else {
                smoothingFactor = this.smoothingFactors.advanced;
            }

            // Apply exponential smoothing
            p.smoothed = p.smoothed + (p.value - p.smoothed) * smoothingFactor;
        });
    }

    /**
     * Set base value for parameter
     */
    setBaseParameter(param, value) {
        if (this.parameters[param]) {
            this.parameters[param].base = value;
            // Remove spam logging - only log significant changes
            if (Math.abs(this.parameters[param].base - value) > 0.01) {
                console.log(`🌊 UnifiedReactivitySystem: Base ${param} updated`);
            }
        }
    }

    /**
     * Set multiple base parameters
     */
    setBaseParameters(params) {
        Object.entries(params).forEach(([param, value]) => {
            this.setBaseParameter(param, value);
        });
    }

    /**
     * Configure relationship strength
     */
    configureRelationship(relationshipName, multipliers) {
        if (this.relationships[relationshipName]) {
            Object.assign(this.relationships[relationshipName].multipliers, multipliers);
            console.log(`🌊 UnifiedReactivitySystem: ${relationshipName} relationship updated`);
        }
    }

    /**
     * Enable/disable breathing patterns
     */
    setBreathingEnabled(enabled) {
        this.breathingPatterns.enabled = enabled;
        console.log(`🌊 UnifiedReactivitySystem: Breathing patterns ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Get current parameter state
     */
    getParameterState() {
        const state = {};
        Object.keys(this.parameters).forEach(param => {
            state[param] = {
                base: this.parameters[param].base,
                reactive: this.parameters[param].reactive,
                final: this.parameters[param].smoothed
            };
        });
        return state;
    }

    /**
     * Get relationship information
     */
    getRelationshipInfo() {
        return {
            relationships: Object.keys(this.relationships),
            breathingPatterns: this.breathingPatterns,
            smoothingFactors: this.smoothingFactors
        };
    }
}