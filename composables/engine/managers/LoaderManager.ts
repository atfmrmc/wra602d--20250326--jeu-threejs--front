import {LoadingManager, Object3D} from 'three';
import type {GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export class LoaderManager {
    public onReady?: () => void;
    private loadingManager = new LoadingManager();
    private models: Record<string, Object3D> = {};
    private pending: Promise<any>[] = [];

    constructor(scene: Scene) {
        this.loadingManager.onLoad = () => {
            Promise.all(this.pending).then(() => {
                this.onReady && this.onReady();
            });
        };
    }

    public loadGLTF(name: string, url: string) {
        const promise = new Promise<void>((res, rej) => {
            const loader = new GLTFLoader(this.loadingManager);
            loader.load(
                url,
                (gltf: GLTF) => {
                    this.models[name] = gltf.scene;
                    res();
                },
                undefined,
                rej
            );
        });
        this.pending.push(promise);
    }

    public getModel(name: string): Object3D {
        const src = this.models[name];
        if (!src) throw new Error(`Model "${name}" not found – did you call loadGLTF()?`);
        return src.clone(true);
    }
}

export const Loader = new LoaderManager();
