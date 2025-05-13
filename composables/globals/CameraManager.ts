import {PerspectiveCamera} from "three";

export class CamaraManager implements GlobalObject<Camera> {
    protected camera: Camera;

    constructor(canvas: HTMLCanvasElement) {
        this.camera = this.instantiate();
        this.setting(canvas);
    }

    instantiate(): Camera {
        return new PerspectiveCamera();
    }

    setting(canvas): void {
        this.camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
    }

    getCamera() {
        return this.camera;
    }
}