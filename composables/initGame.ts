import {Vector3} from 'three';

export function initGame() {
    onMounted(() => {
        // Initialize the game engine
        const gameEngine = new GameEngine('game-screen');
        console.log(gameEngine);

        // Load necessary models
        gameEngine.loader.loadGLTF('dice', '/models/dice.glb');

        gameEngine.loader.onReady = () => {
            new Dice(new Vector3(0, 1, 0), gameEngine);
        };

        engine.start();

        // Animation Engine
        /*
        function animate() {
            requestAnimationFrame(animate);
            gameEngine.updater.processFrameUpdates();
            gameEngine.renderer.render(gameEngine.scene, gameEngine.camera);
        }

        animate();
        */
    });
}
