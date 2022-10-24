import { useEffect, useState } from "react";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

/**
 * Takes a value and returns it once hydrated
 */
export function useAfterHydration<T>(value: T) {
  const hydrated = useHydrated();

  if (!hydrated) return null;
  return value;
}
