import {DirectionalLight, Light, Scene} from "three";

export class DirectionalLightManager implements GlobalObject<Light> {
    public directionalLightIntensity = 1;
    protected directionalLight: Light;

    constructor(scene: Scene, intensity: number,) {
        this.directionalLightIntensity = intensity;
        this.directionalLight = this.instantiate();
        this.settings();
    }

    instantiate(): Light {
        return new DirectionalLight();
    }

    settings(): void {
        this.directionalLight.color.set(0xffffff);
        this.directionalLight.intensity = this.directionalLightIntensity;
        this.directionalLight.position.set(0, 10, 10);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.set(64, 64);
        this.directionalLight.shadow.radius = 4;
        this.directionalLight.shadow.bias = -0.001;
        this.directionalLight.shadow.normalBias = 0.05;
    }

    getDirectionalLight() {
        return this.directionalLight;
    }
}