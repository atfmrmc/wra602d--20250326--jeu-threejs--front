// src/game/feature/dice/DiceGroup.ts
import {Group, Scene, Vector3} from 'three';
import {Die} from './Die';
import type {DiceOptions} from '@/utils/diceOptions';

export class DiceGroup {
    private group = new Group();
    private dice: Die[] = [];

    constructor(
        private scene: Scene,
        private options: DiceOptions,
        private basePos: Vector3,     // center of the row/grid
    ) {
    }

    onLoad() {
        this.scene.add(this.group);
    }

    /** Ensure exactly `count` dice exist and are laid out. */
    resize(count: number) {
        const {spacing} = this.options;
        // remove extras
        while (this.dice.length > count) {
            const d = this.dice.pop()!;
            this.group.remove(d.mesh);
        }
        // add missing
        while (this.dice.length < count) {
            const die = new Die(this.group, this.options);
            this.dice.push(die);
        }
        // position them in a row centered at basePos
        this.dice.forEach((die, i) => {
            die.mesh.position.set(
                this.basePos.x + (i - (count - 1) / 2) * spacing,
                this.basePos.y,
                this.basePos.z
            );
        });
    }

    /** Immediately snap all dice to these faces. */
    setValues(values: number[]) {
        this.resize(values.length);
        values.forEach((v, i) => this.dice[i].setFace(v));
    }

    /** Call each frame to smoothly animate flips. */
    animateToValues(values: number[], delta: number) {
        values.forEach((v, i) => this.dice[i]?.animateTo(v, delta));
    }
}
