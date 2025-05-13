export interface DiceOptions {
    size: number;                // edge length of a die
    spacing: number;             // distance between dice in a group
    texturePath: string;         // base URL for face textures
    animationSpeed: number;      // smoothing factor for rotation
}

export const defaultDiceOptions: DiceOptions = {
    size: 1,
    spacing: 1.2,
    texturePath: '/textures/dice',
    animationSpeed: 0.2,
};
