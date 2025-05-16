import {Object3D, Vector3} from 'three';
import {defaultDiceOptions} from '../../utils/DiceOptions';
import {gameEngine} from './../../engine/GameEngine';
import {gsap} from 'gsap';

export class Dice implements GameObject {
    public positionOrigin: Vector3 = new Vector3(0, 0, 0);
    public positionOffset: Vector3 = new Vector3(0, 0, 0);
    public rotationOrigin: Vector3 = new Vector3(0, 0, 0);
    public rotationOffset: Vector3 = new Vector3(0, 0, 0);
    public mesh: Object3D;

    /**
     * This arrays contains the dice faces.
     * And the rotation of the dice that is used to display the face.
     */
    private currentFace: 1 | 2 | 3 | 4 | 5 | 6 = 6;
    private diceFaces: Record<DiceFace, Vector3> = {
        1: new Vector3(0, -Math.PI / 2, 0),
        2: new Vector3(-Math.PI / 2, 0, 0),
        3: new Vector3(Math.PI / 2, 0, 0),
        4: new Vector3(0, Math.PI, 0),
        5: new Vector3(0, Math.PI / 2, 0),
        6: new Vector3(0, 0, 0),
    };

    /**
     * Spawns a new die into the scene by cloning the preloaded model.
     */
    constructor(
        public starterPosition: Vector3 = new Vector3(),
    ) {
        // Load the model and set its scale
        this.mesh = gameEngine.loader.getModel('dice');
        this.mesh.scale.set(defaultDiceOptions.size, defaultDiceOptions.size, defaultDiceOptions.size);

        this.mesh.traverse((child) => {
            if ((child as Mesh).isMesh) {
                (child as Mesh).castShadow = true;
                (child as Mesh).receiveShadow = true;
            }
        });

        // Set the initial position and rotation of the die
        this.positionOrigin.copy(starterPosition);
        this.mesh.position.copy(this.positionOrigin);

        this.setFace(this.currentFace);

        // Add the dice to the scene
        gameEngine.addObject(this);

        gsap.to(this.positionOffset, {
            y: Math.sin(.5),
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });

        gsap.to(this.rotationOffset, {
            startAt: {x: -0.05},
            x: .05,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(this.rotationOffset, {
            startAt: {y: -0.07},
            y: .07,
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        gsap.to(this.rotationOffset, {
            startAt: {z: -0.1},
            z: .1,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }

    /**
     * Moves the dice to the specified target position.
     * @param target
     * @param duration
     * @param ease
     */
    public moveTo(
        target: Vector3,
        duration: number = 1,
        ease: string = "elastic.out(1,1)"
    ) {
        gsap.to(this.positionOrigin, {
            x: target.x,
            y: target.y,
            z: target.z,
            duration: duration,
            ease: ease,
        });
    }

    /**
     * Sets the face of the dice to the specified value.
     * @param face
     */
    public setFace(face: number) {
        this.currentFace = face;

        const rotation = this.diceFaces[face];
        gsap.to(this.rotationOrigin, {
            startAt: {
                x: this.rotationOrigin.x - Math.PI * 2,
                y: this.rotationOrigin.y - Math.PI * 2,
                z: this.rotationOrigin.z - Math.PI * 2
            },
            x: rotation.x,
            y: rotation.y,
            z: rotation.z,
            duration: 2,
            ease: "elastic.out(1,0.75)",
        });
    }

    /**
     * Updates the position and rotation of the dice each frame.
     * @param elapsedTime
     */
    onUpdate(elapsedTime: number): void {
        if (!this.mesh) return;

        this.mesh.position
            .copy(this.positionOrigin)
            .add(this.positionOffset);

        this.mesh.rotation.set(
            this.rotationOrigin.x + this.rotationOffset.x,
            this.rotationOrigin.y + this.rotationOffset.y,
            this.rotationOrigin.z + this.rotationOffset.z
        );

    }
}