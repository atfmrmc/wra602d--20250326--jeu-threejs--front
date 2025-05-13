import {AmbientLight, Light} from "three";

export class AmbientLightManager implements GlobalObject<Light> {
    public ambientLightIntensity: number = 1;
    protected ambientLight: Light;

    constructor() {
        this.ambientLight = this.instantiate();
        this.setting();
    }

    instantiate(): Light {
        return new AmbientLight(0x404040, this.ambientLightIntensity);
    }

    setting(): void {
    }

    getAmbientLight() {
        return this.ambientLight;
    }
}