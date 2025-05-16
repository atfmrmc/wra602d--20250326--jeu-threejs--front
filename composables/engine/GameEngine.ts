export class GameEngine {
    display: DisplayManager;
    scene: SceneManager;
    renderer: RendererManager;
    camera: CameraManager;
    lights: array<DirectionalLightManager | AmbientLightManager>;
    loader: LoaderManager;
    updater: UpdatesManager;
    private readonly canvasId: string;

    constructor(canvasId: string) {
        this.canvasId = canvasId;
    }

    instantiate() {
        this.display = new DisplayManager(this.canvasId);

        if (!(this.display.displayElement instanceof HTMLCanvasElement)) {
            throw new Error(`Canvas #${this.canvasId} not found`);
        }

        this.renderer = new RendererManager(this.display.displayElement, this.display.displaySize).getRenderer();
        this.scene = new SceneManager().getScene();
        this.camera = new CameraManager(this.display.displaySize).getCamera();
        this.lights = {
            baseDirectionalLight: new DirectionalLightManager(this.scene, 1).getDirectionalLight(),
            baseAmbientLight: new AmbientLightManager(this.scene, 1).getAmbientLight()
        };
        this.loader = new LoaderManager();
        this.updater = new UpdatesManager(this.scene, this.renderer, this.camera);

        // Set the renderer to the display element
        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.settings();
        this.start();
    }

    start(): void {
        this.loader.loadGLTF('dice', '/models/dice.glb');
        this.onResize();

        const animate = () => {
            requestAnimationFrame(animate);
            this.updater.processFrameUpdates();
            this.renderer.render(this.scene, this.camera);
        };
        animate()
    }


    settings() {
    }

    onResize() {
        this.display.setDisplaySize();
        this.renderer.setSize(this.display.displaySize.w, this.display.displaySize.h, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.aspect = this.display.displaySize.w / this.display.displaySize.h;
        this.camera.updateProjectionMatrix();
    }

    public addObject(obj: GameObject): void {
        this.scene.add(obj.mesh);
        this.updater.addAnimatableObject(obj);
    }

    public removeObject(obj: GameObject) {
        this.scene.remove(obj.mesh);
        this.updater.removeAnimatableObject(obj);
    }
}

export const gameEngine = new GameEngine('game-screen');