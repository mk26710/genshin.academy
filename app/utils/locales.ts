export const supportedLocales = ["ru", "en"] as const;
export const defaultLocale = "en" as const;

export type UserLocale = (typeof supportedLocales)[number];
