import {Clock} from 'three';
import type {GameObject} from '../../utils/interfaces/GameObject';

export class UpdatesManager {
    private animatableObjects: GameObject[] = [];
    private clock: Clock;

    constructor() {
        this.clock = new Clock();
    }


    /**
     * Adds a GameObject to the list of objects to be updated each frame.
     * @param object The GameObject to add.
     */
    public addAnimatableObject(object: GameObject): void {
        if (!this.animatableObjects.includes(object)) {
            this.animatableObjects.push(object);
        }
    }

    /**
     * Removes a GameObject from the list of objects to be updated.
     * @param object The GameObject to remove.
     */
    public removeAnimatableObject(object: GameObject): void {
        const index = this.animatableObjects.indexOf(object);
        if (index > -1) {
            this.animatableObjects.splice(index, 1);
        }
    }

    /**
     * Processes the frame updates for all registered GameObjects.
     */
    public processFrameUpdates(): void {
        const deltaTimeSeconds = this.clock.getDelta(); // Time in seconds since last call
        const elapsedTimeSeconds = this.clock.elapsedTime; // Total time elapsed, in seconds

        // Convert to milliseconds for compatibility with Three.js
        const timestampMilliseconds = elapsedTimeSeconds * 1000;
        const deltaTimeMilliseconds = deltaTimeSeconds * 1000;

        if (deltaTimeMilliseconds > 0) {
            // Update all registered objects
            for (const object of [...this.animatableObjects]) {
                // Check if the object is still registered
                if (this.animatableObjects.includes(object)) {
                    object.onUpdate(timestampMilliseconds, deltaTimeMilliseconds);
                }
            }
        }
    }

    /**
     * Resets the internal clock.
     */
    public resetClock(): void {
        this.clock.stop();
        this.clock.start(); // Resets elapsedTime to 0 and starts the clock
    }

    /**
     *  Returns the list of registered GameObjects.
     *  For Debugging purposes only.
     */
    public getRegisteredObjects(): ReadonlyArray<GameObject> {
        return this.animatableObjects;
    }
}