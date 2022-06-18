import { inject } from "vue";
import type { InjectionKey } from "vue";
import deepFreeze from "deep-freeze";

// very useful article on type safe injection - https://logaretm.com/blog/type-safe-provide-inject/
export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T) => {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`${key} was not resolved.`);
  }

  return resolved;
};

/**
 * Tranform function for zod `.transform()` that makes an object deeply frozen
 */
export const deepFreezeTransform = <T>(val: T) => {
  return deepFreeze(val);
};

export const freezeTransform = <T>(val: T) => {
  return Object.freeze(val);
};
