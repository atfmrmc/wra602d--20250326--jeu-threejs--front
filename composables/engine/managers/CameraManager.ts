import {PerspectiveCamera} from "three";

export class CameraManager implements GlobalObject<Camera> {
    protected camera: Camera;

    constructor(displayElement: HTMLCanvasElement) {
        this.camera = this.instantiate(displayElement);
        this.settings();
    }

    instantiate(displayElement: HTMLCanvasElement): Camera {
        return new PerspectiveCamera(75, displayElement.clientWidth / displayElement.clientHeight, 0.1, 1000);
    }

    settings(): void {
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
    }

    getCamera() {
        return this.camera;
    }
}

