/**
 * Defines a type, possibly wrapped by a Promise.
 */
export type MaybePromise<T> = T | Promise<T>;
