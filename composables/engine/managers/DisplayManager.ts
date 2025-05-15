export class DisplayManager implements GlobalObject<HTMLCanvasElement | null> {
    public displayElementId: string;
    public displayElement: HTMLCanvasElement | null = null;

    constructor(displayId: string) {
        this.displayElementId = displayId;
        this.instantiate();
    }

    instantiate(): HTMLCanvasElement | null {
        this.displayElement = document.getElementById(this.displayElementId);
        if (!(this.displayElement instanceof HTMLCanvasElement)) {
            throw new Error(`DisplayManager: no <canvas id="${this.displayElementId}"> found`);
        }
        return this.displayElement;
    }
}