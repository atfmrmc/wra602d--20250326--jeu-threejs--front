export interface GlobalObject<T> {
    instantiate(): T;

    setting(): void;
}