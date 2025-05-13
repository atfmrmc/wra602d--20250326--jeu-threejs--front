import {DirectionalLight, Light} from "three";

export class DirectionalLightManager implements GlobalObject<Light> {
    protected directionalLight: Light;

    constructor() {
        this.directionalLight = this.instantiate();
        this.setting();
    }

    instantiate(): Light {
        return new DirectionalLight();
    }

    setting(): void {
        this.directionalLight.position.set(0, 100, 0);
    }

    getDirectionalLight() {
        return this.directionalLight;
    }
}