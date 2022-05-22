// very useful article on type safe injection - https://logaretm.com/blog/type-safe-provide-inject/
import { inject } from "vue";
import type { InjectionKey } from "vue";

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T) => {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`${key} was not resolved.`);
  }

  return resolved;
};
