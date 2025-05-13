import {Scene} from "three";

export class SceneManager implements GlobalObject<Scene> {
    protected scene: Scene;

    constructor() {
        this.scene = this.instantiate();
        this.setting();
    }

    instantiate() {
        return new Scene();
    }

    setting(): void {
    }

    getScene(): Scene {
        return this.scene;
    }
}