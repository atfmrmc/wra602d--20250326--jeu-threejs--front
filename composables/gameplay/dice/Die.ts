import {Box3, BoxGeometry, BoxHelper, Euler, Group, Mesh, MeshBasicMaterial, Vector3,} from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import type {DiceOptions} from '@/utils/diceOptions';

const faceToEuler: Record<number, [number, number, number]> = {
    1: [0, 0, 0],
    2: [0, Math.PI / 2, 0],
    3: [Math.PI / 2, 0, 0],
    4: [-Math.PI / 2, 0, 0],
    5: [0, -Math.PI / 2, 0],
    6: [Math.PI, 0, 0],
};

export class Die {
    public mesh: Group;            // now a Group instead of a Mesh
    private targetRot = new Euler();

    constructor(
        private parent: Group,
        private options: DiceOptions, // size, spacing, animationSpeed, etc :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
    ) {
        // 1) Create a Group and add it immediately
        this.mesh = new Group();
        parent.add(this.mesh);

        // 2) Load the OBJ with progress & error callbacks
        const loader = new OBJLoader();
        loader.load(
            '/models/dice.obj',

            // ── onLoad ────────────────────────────────────────────────────────────────
            (obj) => {
                // scale first
                const s = this.options.size;
                obj.scale.set(s, s, s);

                // center the group
                const bbox = new Box3().setFromObject(obj);
                const center = new Vector3();
                bbox.getCenter(center);
                obj.position.sub(center);

                // override materials so we can see it immediately
                obj.traverse((child) => {
                    if ((child as Mesh).isMesh) {
                        (child as Mesh).material = new MeshBasicMaterial({
                            color: 0xff00ff,
                            wireframe: true,
                        });
                    }
                });

                // add the actual model
                this.mesh.add(obj);

                // add a BoxHelper so you see the full extent
                const helper = new BoxHelper(obj, 0x00ff00);
                this.mesh.add(helper);

                // **DEBUG CUBE** — a simple green cube at the die’s pivot
                const marker = new Mesh(
                    new BoxGeometry(s, s, s),
                    new MeshBasicMaterial({color: 0x00ff00, wireframe: false})
                );
                // marker sits at mesh’s local 0,0,0 which is the die’s pivot
                this.mesh.add(marker);
            },

            // ── onProgress ─────────────────────────────────────────────────────────────
            (xhr) => {
                if (xhr.total) {
                    console.log(`[Die] loading: ${((xhr.loaded / xhr.total) * 100).toFixed(1)}%`);
                }
            },

            // ── onError ────────────────────────────────────────────────────────────────
            (err) => console.error('[Die] failed to load dice.obj', err),
        );
    }

    /** snap to a particular face (1–6) */
    setFace(value: number) {
        const [x, y, z] = faceToEuler[value];
        this.mesh.rotation.set(x, y, z);
    }

    /** smoothly animate to a face over frames */
    animateTo(value: number, delta: number) {
        const [x, y, z] = faceToEuler[value];
        this.targetRot.set(x, y, z);
        // same easing as before
        this.mesh.rotation.x += (this.targetRot.x - this.mesh.rotation.x) * this.options.animationSpeed * delta;
        this.mesh.rotation.y += (this.targetRot.y - this.mesh.rotation.y) * this.options.animationSpeed * delta;
        this.mesh.rotation.z += (this.targetRot.z - this.mesh.rotation.z) * this.options.animationSpeed * delta;
    }
}
