import {gameEngine} from './engine/GameEngine';

export function initGame(config: GameConfig) {
    onMounted(() => {
        gameEngine.instantiate();
        gameEngine.loader.onReady = () => {
            const playerComputer = new Player(
                config.computer.diceCount,
                config.computer.name,
                config.computer.offset
            )
            const playerHuman = new Player(
                config.human.diceCount,
                config.human.name,
                config.human.offset
            )
        }
    });
}