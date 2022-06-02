/**
 * Builds url to character's avatar header
 */
export const avatarHeaderPath = (id: string, extension = "png") => {
  return `/img/characters/${id}/avatar_header.${extension}`;
};
