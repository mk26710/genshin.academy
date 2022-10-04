/**
 * Builds url to character's avatar header
 */
export const avatarHeaderPath = (id: string, extension = "png") => {
  return `/img/characters/${id}/avatar_header.${extension}`;
};

/**
 * Builds url to character's icon
 */
export const characterIcon = (id: string, ext = "png") => {
  return `/img/characters/${id}/icon.${ext}`;
};

/**
 * Builds url to character's avatar
 */
export const avatarPath = (id: string, ext = "png") => {
  return `/img/characters/${id}/avatar.${ext}`;
};

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export const safeRedirect = (
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) => {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
};
