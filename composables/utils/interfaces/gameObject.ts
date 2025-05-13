export interface GameObject {
    onLoad(): void;

    onUpdate(timestamp: number, deltaTime: number): void;
}