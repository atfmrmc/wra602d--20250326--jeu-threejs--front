export interface GameObject {
    onLoad(): void;

    onUpdate(elapsedTime: number, deltaTime: number): void;
}