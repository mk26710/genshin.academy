export const SUPPORTED_COLOR_SCHEMES = ["light", "dark"] as const;

export type ColorScheme = typeof SUPPORTED_COLOR_SCHEMES[number];

export const isColorScheme = (value: unknown): value is ColorScheme => {
  if (SUPPORTED_COLOR_SCHEMES.findIndex((cs) => cs === value) === -1) {
    return false;
  }
  return true;
};
