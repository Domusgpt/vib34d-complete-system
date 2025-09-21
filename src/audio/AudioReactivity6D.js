/**
 * VIB34D 6D Audio Reactivity System
 * ULTRA-ADVANCED: Full 6-degree 4D rotation control with audio analysis
 * Maps audio frequencies to all 6 possible 4D rotation planes: XW, YW, ZW, XY, XZ, YZ
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * Join The Exoditical Moral Architecture Movement: Parserator.com
 * "The Revolution Will Not be in a Structured Format"
 *
 * © 2025 Paul Phillips - Clear Seas Solutions LLC - All Rights Reserved
 */

export class AudioReactivity6D {
    constructor() {
        this.audioContext = null;
        this.microphone = null;
        this.analyser = null;
        this.dataArray = null;
        this.isActive = false;
        this.isListening = false;

        // 6D Rotation mapping configuration
        this.rotationMapping = {
            rot4dXW: { freqBand: [0, 85], sensitivity: 2.5, smoothing: 0.15 },      // Sub-bass to XW rotation
            rot4dYW: { freqBand: [86, 255], sensitivity: 2.0, smoothing: 0.12 },    // Bass to YW rotation
            rot4dZW: { freqBand: [256, 512], sensitivity: 1.8, smoothing: 0.10 },   // Low-mid to ZW rotation
            rot4dXY: { freqBand: [513, 1024], sensitivity: 1.5, smoothing: 0.08 },  // Mid to XY rotation
            rot4dXZ: { freqBand: [1025, 1536], sensitivity: 1.3, smoothing: 0.06 }, // High-mid to XZ rotation
            rot4dYZ: { freqBand: [1537, 2048], sensitivity: 1.0, smoothing: 0.04 }  // High to YZ rotation
        };

        // Rotation state tracking
        this.currentRotations = {
            rot4dXW: 0, rot4dYW: 0, rot4dZW: 0,
            rot4dXY: 0, rot4dXZ: 0, rot4dYZ: 0
        };

        // Smoothed values for reactivity
        this.smoothedValues = {
            rot4dXW: 0, rot4dYW: 0, rot4dZW: 0,
            rot4dXY: 0, rot4dXZ: 0, rot4dYZ: 0
        };

        // Advanced audio analysis
        this.fftSize = 4096;  // High resolution for precise frequency mapping
        this.updateCallback = null;
        this.analysisFrame = 0;

        // Musical harmony detection for enhanced reactivity
        this.harmonicAnalysis = {
            fundamentals: [82.41, 110, 146.83, 196, 246.94, 329.63, 440], // Musical notes
            harmonicWeights: [1.0, 0.8, 0.6, 0.4, 0.3, 0.2, 0.1],
            beatDetection: { threshold: 1.3, history: [] }
        };

        console.log('🎵 AudioReactivity6D: Advanced 6-degree 4D rotation audio system initialized');
    }

    /**
     * Initialize audio system with microphone access
     */
    async initialize() {
        try {
            console.log('🎵 AudioReactivity6D: Requesting microphone access for 6D rotation control...');

            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    sampleRate: 44100
                }
            });

            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.microphone = this.audioContext.createMediaStreamSource(stream);

            // Create analyser with high resolution
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.fftSize;
            this.analyser.smoothingTimeConstant = 0.1; // Fast response for reactive rotation
            this.analyser.minDecibels = -80;
            this.analyser.maxDecibels = -10;

            // Connect microphone to analyser
            this.microphone.connect(this.analyser);

            // Create data array for frequency analysis
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

            console.log(`✅ AudioReactivity6D: Audio initialized with ${this.analyser.frequencyBinCount} frequency bins`);
            console.log('🎵 AudioReactivity6D: 6D rotation mapping ready - make some noise!');

            return true;
        } catch (error) {
            console.error('❌ AudioReactivity6D: Failed to initialize audio:', error);
            return false;
        }
    }

    /**
     * Start audio-reactive 6D rotation control
     */
    startListening(updateCallback) {
        if (!this.analyser) {
            console.warn('🎵 AudioReactivity6D: Audio not initialized');
            return false;
        }

        this.isListening = true;
        this.updateCallback = updateCallback;

        console.log('🎵 AudioReactivity6D: Starting 6D audio-reactive rotation control');
        this.processAudio();

        return true;
    }

    /**
     * Stop audio listening
     */
    stopListening() {
        this.isListening = false;
        this.updateCallback = null;
        console.log('🎵 AudioReactivity6D: Stopped audio listening');
    }

    /**
     * Main audio processing loop - Maps frequencies to 6D rotations
     */
    processAudio() {
        if (!this.isListening || !this.analyser) return;

        // Get frequency data
        this.analyser.getByteFrequencyData(this.dataArray);

        // Process each rotation axis
        Object.keys(this.rotationMapping).forEach(rotationAxis => {
            const mapping = this.rotationMapping[rotationAxis];
            const audioLevel = this.getFrequencyBandLevel(mapping.freqBand[0], mapping.freqBand[1]);

            // Apply sensitivity and convert to rotation value
            const targetRotation = (audioLevel / 255.0) * mapping.sensitivity * Math.PI * 2;

            // Smooth the rotation for fluid motion
            this.smoothedValues[rotationAxis] = this.lerp(
                this.smoothedValues[rotationAxis],
                targetRotation,
                mapping.smoothing
            );

            // Update current rotation
            this.currentRotations[rotationAxis] = this.smoothedValues[rotationAxis];
        });

        // Enhanced musical reactivity
        this.processMusicalHarmonics();

        // Beat detection for rhythm-sync rotation bursts
        this.detectBeats();

        // Send updates to active system
        if (this.updateCallback) {
            this.updateCallback(this.currentRotations);
        }

        this.analysisFrame++;

        // Continue processing
        requestAnimationFrame(() => this.processAudio());
    }

    /**
     * Get audio level for specific frequency band
     */
    getFrequencyBandLevel(startBin, endBin) {
        let sum = 0;
        let count = 0;

        for (let i = startBin; i <= Math.min(endBin, this.dataArray.length - 1); i++) {
            sum += this.dataArray[i];
            count++;
        }

        return count > 0 ? sum / count : 0;
    }

    /**
     * Process musical harmonics for enhanced responsiveness
     */
    processMusicalHarmonics() {
        this.harmonicAnalysis.fundamentals.forEach((fundamental, index) => {
            const binIndex = Math.floor(fundamental * this.fftSize / this.audioContext.sampleRate);

            if (binIndex < this.dataArray.length) {
                const harmonicLevel = this.dataArray[binIndex];
                const weight = this.harmonicAnalysis.harmonicWeights[index];

                // Enhance rotation based on musical harmony
                if (harmonicLevel > 128) { // Strong harmonic presence
                    const enhancement = (harmonicLevel / 255.0) * weight * 0.3;

                    // Apply harmonic enhancement to specific rotation pairs
                    switch (index % 3) {
                        case 0: // Low harmonics -> XW, YW
                            this.currentRotations.rot4dXW += enhancement;
                            this.currentRotations.rot4dYW += enhancement * 0.7;
                            break;
                        case 1: // Mid harmonics -> ZW, XY
                            this.currentRotations.rot4dZW += enhancement;
                            this.currentRotations.rot4dXY += enhancement * 0.7;
                            break;
                        case 2: // High harmonics -> XZ, YZ
                            this.currentRotations.rot4dXZ += enhancement;
                            this.currentRotations.rot4dYZ += enhancement * 0.7;
                            break;
                    }
                }
            }
        });
    }

    /**
     * Beat detection for rhythm-synchronized rotation bursts
     */
    detectBeats() {
        // Calculate overall energy
        const totalEnergy = this.dataArray.reduce((sum, value) => sum + value, 0) / this.dataArray.length;

        // Store energy history for beat detection
        this.harmonicAnalysis.beatDetection.history.push(totalEnergy);
        if (this.harmonicAnalysis.beatDetection.history.length > 10) {
            this.harmonicAnalysis.beatDetection.history.shift();
        }

        // Calculate average energy
        const avgEnergy = this.harmonicAnalysis.beatDetection.history.reduce((sum, val) => sum + val, 0) /
                         this.harmonicAnalysis.beatDetection.history.length;

        // Beat detected if current energy significantly exceeds average
        if (totalEnergy > avgEnergy * this.harmonicAnalysis.beatDetection.threshold) {
            this.triggerBeatReaction();
        }
    }

    /**
     * Trigger synchronized rotation burst on beat detection
     */
    triggerBeatReaction() {
        const beatIntensity = 0.5;
        const rotationBurst = Math.PI / 4; // 45-degree burst

        // Synchronized rotation burst across all 6 axes
        Object.keys(this.currentRotations).forEach(axis => {
            this.currentRotations[axis] += rotationBurst * beatIntensity * (Math.random() * 0.5 + 0.5);
        });

        console.log('🥁 AudioReactivity6D: Beat detected - 6D rotation burst triggered!');
    }

    /**
     * Linear interpolation for smooth transitions
     */
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    /**
     * Set sensitivity for specific rotation axis
     */
    setSensitivity(axis, sensitivity) {
        if (this.rotationMapping[axis]) {
            this.rotationMapping[axis].sensitivity = sensitivity;
            console.log(`🎵 AudioReactivity6D: ${axis} sensitivity set to ${sensitivity}`);
        }
    }

    /**
     * Set smoothing for specific rotation axis
     */
    setSmoothing(axis, smoothing) {
        if (this.rotationMapping[axis]) {
            this.rotationMapping[axis].smoothing = smoothing;
            console.log(`🎵 AudioReactivity6D: ${axis} smoothing set to ${smoothing}`);
        }
    }

    /**
     * Get current audio levels for visualization
     */
    getAudioLevels() {
        if (!this.dataArray) return null;

        return {
            overall: this.dataArray.reduce((sum, val) => sum + val, 0) / this.dataArray.length / 255.0,
            bass: this.getFrequencyBandLevel(0, 255) / 255.0,
            mid: this.getFrequencyBandLevel(256, 1024) / 255.0,
            high: this.getFrequencyBandLevel(1025, 2048) / 255.0,
            rotations: { ...this.currentRotations }
        };
    }

    /**
     * Get system status
     */
    getStatus() {
        return {
            isInitialized: !!this.audioContext,
            isListening: this.isListening,
            sampleRate: this.audioContext?.sampleRate || 0,
            fftSize: this.fftSize,
            frequencyBins: this.analyser?.frequencyBinCount || 0,
            analysisFrames: this.analysisFrame
        };
    }

    /**
     * Enable/disable audio reactivity
     */
    setActive(active) {
        this.isActive = active;

        if (active && !this.isListening) {
            console.log('🎵 AudioReactivity6D: Activating 6D audio-reactive rotation control');
        } else if (!active && this.isListening) {
            this.stopListening();
            console.log('🎵 AudioReactivity6D: Deactivating audio reactivity');
        }
    }

    /**
     * Cleanup audio resources
     */
    destroy() {
        this.stopListening();

        if (this.microphone) {
            this.microphone.disconnect();
        }

        if (this.audioContext) {
            this.audioContext.close();
        }

        console.log('🎵 AudioReactivity6D: Audio resources cleaned up');
    }
}