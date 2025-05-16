import {PerspectiveCamera} from 'three';

export class CameraManager implements GlobalObject<Camera> {
    protected camera: Camera;

    constructor(displaySize: { w: number; h: number }) {
        this.camera = this.instantiate(displaySize);
        this.settings();
    }

    instantiate(displaySize: { w: number; h: number }): Camera {
        return new PerspectiveCamera(75, displaySize.w / displaySize.h, 0.1, 1000);
    }

    settings(): void {
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
    }

    getCamera() {
        return this.camera;
    }

    setSize(displaySize: { w: number; h: number }): void {
        this.camera.aspect = displaySize.w / displaySize.h;
        this.camera.updateProjectionMatrix();
    }
}

