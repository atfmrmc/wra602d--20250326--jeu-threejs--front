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

    addDice() {
        if (this.playersDice.length >= defaultDiceOptions.maxCount) {
            return;
        }
        const d = new Dice();
        this.playersDice.push(d);

        gsap.killTweensOf(d.mesh.scale)

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
        if (!this.playersDice.length) return
        const d = this.playersDice.pop()!
        // 1) Stop the floating loop on positionOffset:
        gsap.killTweensOf(d.positionOffset)

        // 2) Stop all wobble loops on rotationOffset:
        gsap.killTweensOf(d.rotationOffset)

        // 3) Stop any in-flight scale tweens:
        gsap.killTweensOf(d.mesh.scale)

        gsap.to(d.mesh.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
            ease: 'elastic.out(1, .5)',
            onComplete: () => {
                gameEngine.removeObject(d);
                this.playersDiceCount = this.playersDice.length

                this.calculateDicePositionCompensation()
            }
        });
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

    public rollDice() {
        for (let i = 0; i < this.playersDice.length; i++) {
            const d = this.playersDice[i];
            d.roll();
        }
        return this.getTotalScore()
    }

    public getTotalScore() {
        let newScore = 0;
        for (let i = 0; i < this.playersDice.length; i++) {
            const d = this.playersDice[i];
            newScore += d.currentFace;
        }
        this.playersCurrentScore = newScore;
        return this.playersCurrentScore;
    }
}

export default Player;