import { useEffect, useState } from "react";

/** Very useful article https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
