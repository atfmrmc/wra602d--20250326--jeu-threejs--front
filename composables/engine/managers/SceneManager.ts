import {Scene} from "three";

export class SceneManager implements GlobalObject<Scene> {
    protected scene: Scene;

    constructor() {
        this.scene = this.instantiate();
        this.settings();
    }

    instantiate() {
        return new Scene();
    }

    settings(): void {
    }

    getScene(): Scene {
        return this.scene;
    }

    add(object: Object3D) {
        this.scene.add(object);
    }
}