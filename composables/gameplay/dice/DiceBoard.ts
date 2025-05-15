// src/game/feature/dice/DiceBoard.ts
import {Scene, Vector3} from 'three';

export class DiceBoard {
    private playerGroup: DiceGroup;
    private aiGroup: DiceGroup;

    constructor(
        private scene: Scene,
        options: DiceOptions = defaultDiceOptions
    ) {
        // center player at z = –3, AI at +3
        this.playerGroup = new DiceGroup(scene, options, new Vector3(0, 0.5, -3));
        this.aiGroup = new DiceGroup(scene, options, new Vector3(0, 0.5, 3));
    }

    onLoad() {
        this.playerGroup.onLoad();
        this.aiGroup.onLoad();
    }

    /** Called once when you get your API result */
    setResults(player: number[], ai: number[]) {
        this.playerGroup.setValues(player);
        this.aiGroup.setValues(ai);
    }

    /** If you want animation each frame, call this in your loop */
    animate(now: number, delta: number, player: number[], ai: number[]) {
        this.playerGroup.animateToValues(player, delta);
        this.aiGroup.animateToValues(ai, delta);
    }
}
