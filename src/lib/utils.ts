// very useful article on type safe injection - https://logaretm.com/blog/type-safe-provide-inject/
import { InjectionKey, inject } from "vue";

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T) => {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`${key.description} was not resolved.`);
  }

  return resolved;
};
