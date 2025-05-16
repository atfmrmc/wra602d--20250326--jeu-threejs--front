import {gameEngine} from './engine/GameEngine';
import Player from './gameplay/dice/PlayerDice';

export const players = ref<Player[]>([])

export function initGame(config: GameConfig) {
    onMounted(() => {
        gameEngine.instantiate();
        gameEngine.loader.onReady = () => {
            players.value = [
                new Player(
                    config.computer.diceCount,
                    config.computer.name,
                    config.computer.offset,
                ),
                new Player(
                    config.human.diceCount,
                    config.human.name,
                    config.human.offset
                )
            ]
        }
    });
}