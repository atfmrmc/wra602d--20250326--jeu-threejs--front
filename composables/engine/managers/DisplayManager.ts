export class DisplayManager implements GlobalObject<HTMLCanvasElement | null> {
    public displayElementId: string;
    public displayElement: HTMLCanvasElement | null = null;
    public displaySize: { w: number; h: number } = {w: 0, h: 0};

    constructor(displayId: string) {
        this.displayElementId = displayId;
        this.instantiate();
    }

    instantiate(): HTMLCanvasElement | null {
        this.displayElement = document.getElementById(this.displayElementId);
        if (!(this.displayElement instanceof HTMLCanvasElement)) {
            throw new Error(`DisplayManager: no <canvas id="${this.displayElementId}"> found`);
        }
        this.setDisplaySize()

        return this.displayElement;
    }

    setDisplaySize(): void {
        this.displaySize.w = this.displayElement.clientWidth;
        this.displaySize.h = this.displayElement.clientHeight;
    }
}