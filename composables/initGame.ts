export function initGame() {
    onMounted(() => {
        console.log("initGame")


        // Scene
        const sceneManager = new SceneManager()
        setSceneManager(sceneManager)
        const scene = sceneManager.getScene()

        // Renderer
        const rendererManager = new RendererManager()
        setRendererManager(rendererManager)
        const renderer = rendererManager.getRenderer()

        // Canvas
        const canvas = rendererManager.getCanvas()

        // Camera
        const cameraManager = new CamaraManager(canvas)
        setCameraManager(cameraManager)
        const camera = cameraManager.getCamera();

        const ambMgr = new AmbientLightManager(scene)
        setAmbientLightManager(ambMgr)

        const dirMgr = new DirectionalLightManager(scene)
        setDirectionalLightManager(dirMgr)

        const diceBoard = new DiceBoard(scene);
        diceBoard.onLoad();

        diceBoard.setResults([2, 6, 3], [1, 4, 5]);

        
        // Animation
        let lastTime: number = 0;

        function animate(timestamp: number) {
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            const currentPlayerRolls = [6, 2, 3];
            const currentAiRolls = [6, 2, 3];

            // tween the dice toward those faces
            diceBoard.animate(timestamp, deltaTime, currentPlayerRolls, currentAiRolls);

            renderer.render(scene, camera);

            requestAnimationFrame(animate)
        }

        animate()
    });
}
