export class GameEngine {
    display: DisplayManager;
    scene: SceneManager;
    renderer: RendererManager;
    camera: CameraManager;
    lights: array<DirectionalLightManager | AmbientLightManager>;
    loader: LoaderManager;
    updater: UpdatesManager;

    constructor(displayElementId: string) {
        this.instantiate(displayElementId);
        this.settings();
    }

    instantiate(displayElementId) {
        this.display = new DisplayManager(displayElementId);
        this.renderer = new RendererManager(this.display.displayElement).getRenderer();
        this.scene = new SceneManager(this.display.displayElement).getScene();
        this.camera = new CameraManager(this.display.displayElement).getCamera();
        this.lights = {
            baseDirectionalLight: new DirectionalLightManager(this.scene).getDirectionalLight(),
            baseAmbientLight: new AmbientLightManager(this.scene).getAmbientLight()
        };
        this.loader = new LoaderManager();
        this.updater = new UpdatesManager(this.scene, this.renderer, this.camera);
    }

    settings() {
    }

    start(): void {
    }
}
