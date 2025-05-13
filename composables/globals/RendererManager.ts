// RendererManager.ts
import {WebGLRenderer} from 'three';

export class RendererManager implements GlobalObject<WebGLRenderer> {
    protected renderer: WebGLRenderer;
    protected canvas: HTMLCanvasElement;

    constructor(targetCanvasId = 'game-screen') {
        const el = document.getElementById(targetCanvasId);
        if (!(el instanceof HTMLCanvasElement)) {
            throw new Error(`RendererManager: no <canvas id="${targetCanvasId}"> found`);
        }
        this.canvas = el;

        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });

        this.setting();
    }

    getRenderer(): WebGLRenderer {
        return this.renderer;
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    protected setting(): void {
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }


}
