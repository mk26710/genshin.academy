const DEFAULT_AVATAR_URL =
  "https://cdn.discordapp.com/attachments/1002129706591715379/1029777815287124018/default.webp";

export const useAvatarUrl = (s: string | undefined | null) => {
  if (s == null) {
    return DEFAULT_AVATAR_URL;
  }

  if (s.length < 1) {
    return DEFAULT_AVATAR_URL;
  }

  return s;
};
