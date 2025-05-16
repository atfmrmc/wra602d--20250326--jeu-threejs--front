import {PCFSoftShadowMap, WebGLRenderer} from 'three';

export class RendererManager implements GlobalObject<WebGLRenderer> {
    protected renderer: WebGLRenderer;

    constructor(displayElement: HTMLCanvasElement | null, displaySize: { w: number; h: number }) {
        if (displayElement) {
            this.instantiate(displayElement)
            this.settings(displayElement);
        }
    }

    instantiate(displayElement: HTMLCanvasElement | null): WebGLRenderer {
        return this.renderer = new WebGLRenderer({
            canvas: displayElement!,
            antialias: true,
            alpha: true,
        });
    }

    settings(displaySize: { w: number; h: number }): void {
        this.renderer.setSize(displaySize.w, displaySize.h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
    }

    getRenderer(): WebGLRenderer {
        return this.renderer;
    }
}