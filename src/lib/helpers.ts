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
