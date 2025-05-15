import {AmbientLight, Light} from "three";

export class AmbientLightManager implements GlobalObject<Light> {
    public ambientLightIntensity = 1;
    protected ambientLight: AmbientLight;

    constructor(intensity: number) {
        this.ambientLightIntensity = intensity;
        this.ambientLight = this.instantiate();
        this.settings();
    }

    instantiate(): Light {
        return new AmbientLight();
    }

    settings(): void {
        this.ambientLight.color.set(0xffffff);
        this.ambientLight.intensity = this.ambientLightIntensity;
    }

    getAmbientLight() {
        return this.ambientLight;
    }
}