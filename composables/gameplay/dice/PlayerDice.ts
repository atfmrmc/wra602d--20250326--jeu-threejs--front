import {Dice} from './Dice';

export class PlayerDice {
    private dice: Dice[] = [];

    /**
     * @param initialCount  how many to start with
     * @param startPositions optional positions to lay them out
     */
    constructor(
        initialCount: number = 0,
        private startPositions: Vector3[] = []
    ) {
        // spawn any starting dice
        for (let i = 0; i < initialCount; i++) {
            this.addDice(this.startPositions[i] || new Vector3(i * 2, 1, 0));
        }
    }

    /** number of dice the player currently has */
    public getCount(): number {
        return this.dice.length;
    }

    /**
     * Spawns a new dice at the given world position.
     * Returns the Dice instance in case you want to animate it.
     */
    public addDice(position: Vector3 = new Vector3(0, 1, 0)): Dice {
        const dice = new Dice(position);
        this.dice.push(dice);
        return dice;
    }

    /**
     * Removes the most recently added dice from the scene.
     * Returns it in case you need to do cleanup/animation.
     */
    public removeDice(): Dice | undefined {
        const dice = this.dice.pop();
        if (dice) this.scene.remove(dice.mesh);
        return dice;
    }

    /**
     * Take the array of face-results from your API (e.g. [3,1,6])
     * and orient each spawned Dice accordingly.
     */
    public setResults(results: number[]): void {
        if (results.length !== this.dice.length) {
            throw new Error(
                `PlayerDice.setResults: expected ${this.dice.length} values, got ${results.length}`
            );
        }
        results.forEach((value, i) => {
            this.dice[i].setValue(value);
        });
    }

    /** (Optional) get the raw Dice instances, e.g. to wire into your UpdatesManager */
    public getDice(): Dice[] {
        return [...this.dice];
    }
}
