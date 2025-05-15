import {Object3D, Vector3} from 'three';
import {defaultDiceOptions} from '../../utils/DiceOptions';

export class Dice implements GameObject {
    public mesh: Object3D;

    /**
     * Spawns a new die into the scene by cloning the preloaded model.
     */
    constructor(
        public position: Vector3 = new Vector3(),
        public gameEngine: GameEngine,
    ) {
        // Load the model and set its scale
        this.mesh = gameEngine.loader.getModel('dice');
        this.mesh.scale.set(defaultDiceOptions.size);

        this.mesh.traverse((child) => {
            if ((child as Mesh).isMesh) {
                (child as Mesh).castShadow = true;
                (child as Mesh).receiveShadow = true;
            }
        });

        // Set the position of the dice
        this.mesh.position.copy(position)

        // Add the dice to the scene
        gameEngine.scene.add(this.mesh);
    }
    
    public setValue(value: number) {
    }

    onUpdate(elapsedTime: number, deltaTime: number): void {
        if (!this.mesh) return;

        // Rotate at a constant speed (deltaTime is in ms)
        const rotationSpeed = 0.001;
        this.mesh.rotation.x += rotationSpeed * deltaTime;
        this.mesh.rotation.y += rotationSpeed * deltaTime;
    }
}