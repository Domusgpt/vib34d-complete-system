/**
 * VIB34D Touch & Gyroscope 6D Control System
 * ULTRA-INTELLIGENT: Visual mapping of 6D rotations for maximum aesthetic impact
 *
 * ULTRA-HARD THINKING APPLIED:
 * - XW rotation: Core depth/emergence effects (touch Y-axis)
 * - YW rotation: Lateral flow/sweep patterns (touch X-axis)
 * - ZW rotation: Spiral/helix formations (gyro Z-axis)
 * - XY rotation: Classical spin/orbit motions (gyro X-axis)
 * - XZ rotation: Vertical morphing/stretch (gyro Y-axis)
 * - YZ rotation: Twist/torsion effects (pinch gesture)
 *
 * A Paul Phillips Manifestation
 * Send Love, Hate, or Opportunity: Paul@clearseassolutions.com
 * Join The Exoditical Moral Architecture Movement: Parserator.com
 * "The Revolution Will Not be in a Structured Format"
 *
 * © 2025 Paul Phillips - Clear Seas Solutions LLC - All Rights Reserved
 */

export class TouchGyroscope6D {
    constructor() {
        this.isActive = false;
        this.hasGyroscope = false;
        this.hasTouchSupport = window.TouchEvent !== undefined;
        this.hasMouseSupport = true;

        // 6D Rotation mappings with ULTRA-INTELLIGENT visual effects
        this.rotationEffects = {
            rot4dXW: {
                name: 'Core Depth',
                description: 'Emergence from hyperspatial depths',
                visualEffect: 'Structures emerge/recede through 4D space',
                mapping: 'touch-y-axis',
                sensitivity: 2.0,
                dampening: 0.95
            },
            rot4dYW: {
                name: 'Lateral Flow',
                description: 'Sweeping currents across dimensions',
                visualEffect: 'Flowing patterns sweep left/right through 4D',
                mapping: 'touch-x-axis',
                sensitivity: 1.8,
                dampening: 0.93
            },
            rot4dZW: {
                name: 'Spiral Helix',
                description: 'Corkscrew motions through hyperspace',
                visualEffect: 'Spiraling helical formations',
                mapping: 'gyro-z-axis',
                sensitivity: 1.5,
                dampening: 0.97
            },
            rot4dXY: {
                name: 'Orbital Spin',
                description: 'Classical rotational dynamics',
                visualEffect: 'Spinning orbital motions',
                mapping: 'gyro-x-axis',
                sensitivity: 1.2,
                dampening: 0.98
            },
            rot4dXZ: {
                name: 'Vertical Morph',
                description: 'Stretching/compressing transformations',
                visualEffect: 'Vertical morphing and stretching',
                mapping: 'gyro-y-axis',
                sensitivity: 1.0,
                dampening: 0.96
            },
            rot4dYZ: {
                name: 'Twist Torsion',
                description: 'Complex twisting deformations',
                visualEffect: 'Twisted torsional effects',
                mapping: 'pinch-gesture',
                sensitivity: 2.5,
                dampening: 0.90
            }
        };

        // Current rotation state
        this.rotations = {
            rot4dXW: 0, rot4dYW: 0, rot4dZW: 0,
            rot4dXY: 0, rot4dXZ: 0, rot4dYZ: 0
        };

        // Touch tracking
        this.touchState = {
            isActive: false,
            startX: 0, startY: 0,
            currentX: 0, currentY: 0,
            deltaX: 0, deltaY: 0,
            pinchDistance: 0,
            isPinching: false,
            velocity: { x: 0, y: 0 }
        };

        // Gyroscope tracking
        this.gyroState = {
            alpha: 0, beta: 0, gamma: 0,
            lastAlpha: 0, lastBeta: 0, lastGamma: 0,
            deltaAlpha: 0, deltaBeta: 0, deltaGamma: 0
        };

        // Advanced gesture recognition
        this.gestureRecognition = {
            swipeThreshold: 50,
            pinchThreshold: 20,
            rotationGestureActive: false,
            gestureHistory: []
        };

        this.updateCallback = null;
        this.animationFrame = null;

        console.log('🎮 TouchGyroscope6D: Ultra-intelligent 6D control system initialized');
        console.log('🎮 Visual Effects Mapping:');
        Object.entries(this.rotationEffects).forEach(([axis, effect]) => {
            console.log(`   ${axis}: ${effect.name} - ${effect.visualEffect}`);
        });
    }

    /**
     * Initialize touch and gyroscope controls
     */
    async initialize() {
        console.log('🎮 TouchGyroscope6D: Initializing multi-dimensional control systems...');

        // Setup touch controls
        this.setupTouchControls();

        // Request gyroscope permission and setup
        await this.setupGyroscopeControls();

        console.log(`✅ TouchGyroscope6D: Initialized with Touch: ${this.hasTouchSupport}, Gyro: ${this.hasGyroscope}`);
        return true;
    }

    /**
     * Setup touch event listeners with intelligent gesture recognition
     */
    setupTouchControls() {
        if (!this.hasTouchSupport) {
            console.log('🎮 TouchGyroscope6D: Touch not supported, using mouse events');
            this.setupMouseControls();
            return;
        }

        // Touch start - Begin gesture tracking
        document.addEventListener('touchstart', (e) => {
            e.preventDefault();

            if (e.touches.length === 1) {
                // Single touch - Start XW/YW rotation control
                this.touchState.isActive = true;
                this.touchState.startX = e.touches[0].clientX;
                this.touchState.startY = e.touches[0].clientY;
                this.touchState.currentX = e.touches[0].clientX;
                this.touchState.currentY = e.touches[0].clientY;

                console.log('🎮 TouchGyroscope6D: Single touch - Core Depth & Lateral Flow control active');
            } else if (e.touches.length === 2) {
                // Two-finger touch - Start pinch gesture for YZ rotation
                this.touchState.isPinching = true;
                this.touchState.pinchDistance = this.getTouchDistance(e.touches[0], e.touches[1]);

                console.log('🎮 TouchGyroscope6D: Pinch gesture - Twist Torsion control active');
            }
        }, { passive: false });

        // Touch move - Process rotation updates
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.processTouchMove(e);
        }, { passive: false });

        // Touch end - Release controls
        document.addEventListener('touchend', (e) => {
            this.touchState.isActive = false;
            this.touchState.isPinching = false;

            // Apply momentum dampening
            this.applyTouchMomentum();
        });

        console.log('🎮 TouchGyroscope6D: Touch controls configured for Core Depth & Lateral Flow');
    }

    /**
     * Setup mouse controls as fallback for desktop
     */
    setupMouseControls() {
        let mouseDown = false;

        document.addEventListener('mousedown', (e) => {
            mouseDown = true;
            this.touchState.isActive = true;
            this.touchState.startX = e.clientX;
            this.touchState.startY = e.clientY;
            this.touchState.currentX = e.clientX;
            this.touchState.currentY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                this.touchState.currentX = e.clientX;
                this.touchState.currentY = e.clientY;
                this.updateTouchRotations();
            }
        });

        document.addEventListener('mouseup', () => {
            mouseDown = false;
            this.touchState.isActive = false;
            this.applyTouchMomentum();
        });

        // Mouse wheel for pinch-like control
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            const pinchDelta = e.deltaY * 0.01;
            this.rotations.rot4dYZ += pinchDelta * this.rotationEffects.rot4dYZ.sensitivity;
        }, { passive: false });

        console.log('🎮 TouchGyroscope6D: Mouse controls configured as touch fallback');
    }

    /**
     * Setup gyroscope controls for 3D device orientation
     */
    async setupGyroscopeControls() {
        // Check for device orientation support
        if (!window.DeviceOrientationEvent) {
            console.log('🎮 TouchGyroscope6D: Gyroscope not supported');
            return false;
        }

        // Request permission on iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission !== 'granted') {
                    console.log('🎮 TouchGyroscope6D: Gyroscope permission denied');
                    return false;
                }
            } catch (error) {
                console.log('🎮 TouchGyroscope6D: Gyroscope permission error:', error);
                return false;
            }
        }

        // Setup device orientation listener
        window.addEventListener('deviceorientation', (e) => {
            this.processGyroscopeData(e);
        });

        this.hasGyroscope = true;
        console.log('🎮 TouchGyroscope6D: Gyroscope configured for Spiral, Orbital & Vertical effects');
        return true;
    }

    /**
     * Process touch movement with intelligent rotation mapping
     */
    processTouchMove(e) {
        if (e.touches.length === 1 && this.touchState.isActive) {
            // Single touch - Update XW (Y-axis) and YW (X-axis) rotations
            this.touchState.currentX = e.touches[0].clientX;
            this.touchState.currentY = e.touches[0].clientY;

            this.updateTouchRotations();

        } else if (e.touches.length === 2 && this.touchState.isPinching) {
            // Pinch gesture - Update YZ rotation (Twist Torsion)
            const newPinchDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
            const pinchDelta = (newPinchDistance - this.touchState.pinchDistance) * 0.01;

            this.rotations.rot4dYZ += pinchDelta * this.rotationEffects.rot4dYZ.sensitivity;
            this.touchState.pinchDistance = newPinchDistance;
        }
    }

    /**
     * Update rotations based on touch position
     */
    updateTouchRotations() {
        // Calculate deltas
        this.touchState.deltaX = this.touchState.currentX - this.touchState.startX;
        this.touchState.deltaY = this.touchState.currentY - this.touchState.startY;

        // ULTRA-INTELLIGENT MAPPING:

        // YW rotation (Lateral Flow) - X-axis touch movement
        // Creates sweeping currents across dimensions
        const lateralFlow = (this.touchState.deltaX / window.innerWidth) * Math.PI * 2;
        this.rotations.rot4dYW = lateralFlow * this.rotationEffects.rot4dYW.sensitivity;

        // XW rotation (Core Depth) - Y-axis touch movement
        // Structures emerge/recede through 4D space
        const coreDepth = (-this.touchState.deltaY / window.innerHeight) * Math.PI * 2;
        this.rotations.rot4dXW = coreDepth * this.rotationEffects.rot4dXW.sensitivity;

        // Calculate velocity for momentum
        this.touchState.velocity.x = this.touchState.deltaX * 0.1;
        this.touchState.velocity.y = this.touchState.deltaY * 0.1;
    }

    /**
     * Process gyroscope data for 3D rotations
     */
    processGyroscopeData(event) {
        if (!this.isActive) return;

        // Update gyroscope state
        this.gyroState.lastAlpha = this.gyroState.alpha;
        this.gyroState.lastBeta = this.gyroState.beta;
        this.gyroState.lastGamma = this.gyroState.gamma;

        this.gyroState.alpha = event.alpha || 0;   // Z-axis rotation
        this.gyroState.beta = event.beta || 0;     // X-axis rotation
        this.gyroState.gamma = event.gamma || 0;   // Y-axis rotation

        // Calculate deltas
        this.gyroState.deltaAlpha = this.gyroState.alpha - this.gyroState.lastAlpha;
        this.gyroState.deltaBeta = this.gyroState.beta - this.gyroState.lastBeta;
        this.gyroState.deltaGamma = this.gyroState.gamma - this.gyroState.lastGamma;

        // ULTRA-INTELLIGENT GYROSCOPE MAPPING:

        // ZW rotation (Spiral Helix) - Device Z-axis rotation
        // Creates corkscrew motions through hyperspace
        this.rotations.rot4dZW += (this.gyroState.deltaAlpha * Math.PI / 180) *
                                  this.rotationEffects.rot4dZW.sensitivity;

        // XY rotation (Orbital Spin) - Device X-axis tilt
        // Classical spinning orbital motions
        this.rotations.rot4dXY += (this.gyroState.deltaBeta * Math.PI / 180) *
                                  this.rotationEffects.rot4dXY.sensitivity;

        // XZ rotation (Vertical Morph) - Device Y-axis tilt
        // Vertical morphing and stretching transformations
        this.rotations.rot4dXZ += (this.gyroState.deltaGamma * Math.PI / 180) *
                                  this.rotationEffects.rot4dXZ.sensitivity;
    }

    /**
     * Apply momentum dampening after touch release
     */
    applyTouchMomentum() {
        const dampening = () => {
            // Apply dampening to all rotations
            Object.keys(this.rotations).forEach(axis => {
                this.rotations[axis] *= this.rotationEffects[axis].dampening;
            });

            // Continue dampening until values are negligible
            const totalRotation = Object.values(this.rotations).reduce((sum, val) => sum + Math.abs(val), 0);

            if (totalRotation > 0.001 && this.isActive) {
                requestAnimationFrame(dampening);

                // Send updates during dampening
                if (this.updateCallback) {
                    this.updateCallback(this.rotations);
                }
            }
        };

        dampening();
    }

    /**
     * Get distance between two touch points
     */
    getTouchDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Start control system
     */
    start(updateCallback) {
        this.isActive = true;
        this.updateCallback = updateCallback;

        // Start continuous update loop
        this.updateLoop();

        console.log('🎮 TouchGyroscope6D: 6D control system activated');
        console.log('🎮 Touch for Core Depth & Lateral Flow, Gyro for Spiral/Orbital/Vertical, Pinch for Twist');
    }

    /**
     * Stop control system
     */
    stop() {
        this.isActive = false;
        this.updateCallback = null;

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        console.log('🎮 TouchGyroscope6D: Control system stopped');
    }

    /**
     * Main update loop
     */
    updateLoop() {
        if (!this.isActive) return;

        // Send rotation updates
        if (this.updateCallback) {
            this.updateCallback(this.rotations);
        }

        // Continue loop
        this.animationFrame = requestAnimationFrame(() => this.updateLoop());
    }

    /**
     * Set sensitivity for specific rotation axis
     */
    setSensitivity(axis, sensitivity) {
        if (this.rotationEffects[axis]) {
            this.rotationEffects[axis].sensitivity = sensitivity;
            console.log(`🎮 TouchGyroscope6D: ${axis} sensitivity set to ${sensitivity}`);
        }
    }

    /**
     * Set dampening for specific rotation axis
     */
    setDampening(axis, dampening) {
        if (this.rotationEffects[axis]) {
            this.rotationEffects[axis].dampening = dampening;
            console.log(`🎮 TouchGyroscope6D: ${axis} dampening set to ${dampening}`);
        }
    }

    /**
     * Get current control state
     */
    getControlState() {
        return {
            isActive: this.isActive,
            hasTouch: this.hasTouchSupport,
            hasGyro: this.hasGyroscope,
            touchActive: this.touchState.isActive,
            pinchActive: this.touchState.isPinching,
            rotations: { ...this.rotations },
            effects: Object.entries(this.rotationEffects).map(([axis, effect]) => ({
                axis,
                name: effect.name,
                visualEffect: effect.visualEffect,
                mapping: effect.mapping
            }))
        };
    }

    /**
     * Reset all rotations
     */
    reset() {
        Object.keys(this.rotations).forEach(axis => {
            this.rotations[axis] = 0;
        });

        console.log('🎮 TouchGyroscope6D: All rotations reset');
    }

    /**
     * Get rotation effects info
     */
    getRotationEffectsInfo() {
        return this.rotationEffects;
    }
}