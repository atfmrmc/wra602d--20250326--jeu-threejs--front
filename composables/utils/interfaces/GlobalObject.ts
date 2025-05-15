export interface GlobalObject<T> {
    instantiate(): T;

    settings(): void;
}