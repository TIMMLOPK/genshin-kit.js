export interface Time {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

export type KeyToUpperCase<T> = {
    [K in keyof T as Capitalize<string & K>]: T[K];
};