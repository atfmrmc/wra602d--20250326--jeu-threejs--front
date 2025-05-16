import {Dice} from './Dice';
import {defaultDiceOptions} from "~/composables/utils/DiceOptions";
import {gsap} from 'gsap';

export class Player {
    public playerName: string;

    public playersDice: Dice[] = [];
    public playersDiceCount: number = 0;
    private playersCurrentScore: number;

    private diceAnchor: Vector3;
    private dicePositionCompensation: number = 0;

    constructor(numberOfDice: number, playerName: string, diceAnchor: number) {
        this.playerName = playerName;
        this.diceAnchor = diceAnchor;

        for (let i = 0; i < numberOfDice; i++) {
            setTimeout(() => {
                this.addDice(i);
            }, 300 * i);
        }
    }

    addDice(index: number) {
        const d = new Dice();
        this.playersDice.push(d);

        // Add the dice to the scene
        gsap.to(d.mesh.scale, {
            startAt: {x: 0, y: 0, z: 0},
            x: defaultDiceOptions.size,
            y: defaultDiceOptions.size,
            z: defaultDiceOptions.size,
            duration: 2,
            ease: 'elastic.out(1, .5)',
        });

        this.calculateDicePositionCompensation()

        this.playersDiceCount = this.playersDice.length;
    }

    removeDice() {
        if (this.playersDice.length === 0) {
            return;
        }

        const d = this.playersDice.pop();

        gsap.to(d.mesh.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
            ease: 'elastic.out(1, .5)',
            onComplete: () => {
                gameEngine.removeObject(d);
            }
        });

        this.calculateDicePositionCompensation()

        this.playersDiceCount = this.playersDice.length;
    }

    calculateDicePositionCompensation() {
        const count = this.playersDice.length;

        if (count <= 1) {
            this.dicePositionCompensation = 0;
        }

        const halfSpan = (count - 1) / 2 * defaultDiceOptions.spacing;

        for (let i = 0; i < count; i++) {
            const x = (i * defaultDiceOptions.spacing) - halfSpan;
            this.playersDice[i].moveTo({x, y: this.diceAnchor, z: 0});
        }
    }

    getScore() {
        let newScore = 0;
        for (let i = 0; i < this.playersDice.length; i++) {
            const d = this.playersDice[i];
            newScore += d.currentFace;
        }
        this.playersCurrentScore = newScore;
    }
}

export function addPlayerDice(index: number, playerName: string, diceAnchor: number) {
    const d = new PlayerDice(index, playerName, diceAnchor);
    return d;
}
