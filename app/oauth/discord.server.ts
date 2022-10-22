import invariant from "tiny-invariant";
import { z } from "zod";

import { text } from "~/utils/responses.server";

invariant(process.env.DISCORD_CLIENT_ID, "DISCORD_CLIENT_ID must be set");
invariant(process.env.DISCORD_CLIENT_SECRET, "DISCORD_CLIENT_SECRET must be set");
// eslint-disable-next-line prettier/prettier
invariant(process.env.DISCORD_LINK_ACCOUNT_REDIRECT_URI, "DISCORD_LINK_ACCOUNT_REDIRECT_URI must be set");
invariant(process.env.DISCORD_LINK_ACCOUNT_OAUTH_URL, "DISCORD_LINK_ACCOUNT_OAUTH_URL must be set");

invariant(process.env.DISCORD_LOGIN_REDIRECT_URI, "DISCORD_LOGIN_REDIRECT_URI must be set");
invariant(process.env.DISCORD_LOGIN_OAUTH_URL, "DISCORD_LOGIN_OAUTH_URL must be set");

const DISCORD_API_ENDPOINT = "https://discord.com/api/v10";
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_LINK_ACCOUNT_REDIRECT_URI = process.env.DISCORD_LINK_ACCOUNT_REDIRECT_URI;
const DISCORD_LINK_ACCOUNT_OAUTH_URL = process.env.DISCORD_LINK_ACCOUNT_OAUTH_URL;
const DISCORD_LOGIN_REDIRECT_URI = process.env.DISCORD_LOGIN_REDIRECT_URI;
const DISCORD_LOGIN_OAUTH_URL = process.env.DISCORD_LOGIN_OAUTH_URL;

const DiscordOAuthToken = z.object({
  access_token: z.string(),
});

const DiscordOAuthMe = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
});

export const getDiscordLinkOAuthURL = () => DISCORD_LINK_ACCOUNT_OAUTH_URL;
export const getDiscordLoginOAuthURL = () => DISCORD_LOGIN_OAUTH_URL;

type ExchageDiscordCodeOptions = {
  type: "login" | "link";
};

export const exchageDiscordCode = async (code: string, opts: ExchageDiscordCodeOptions) => {
  const payload = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri:
      opts.type === "link" ? DISCORD_LINK_ACCOUNT_REDIRECT_URI : DISCORD_LOGIN_REDIRECT_URI,
  };

  const response = await fetch(DISCORD_API_ENDPOINT + "/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(payload),
  });

  const parseResult = DiscordOAuthToken.passthrough().safeParse(await response.json());
  if (parseResult.success !== true) {
    throw text("Discord responded without an access_token", { status: 500 });
  }

  return parseResult.data;
};

export const getDiscordAccount = async (access_token: string) => {
  const accountResponse = await fetch(DISCORD_API_ENDPOINT + "/oauth2/@me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  const parseAccountJson = DiscordOAuthMe.passthrough().safeParse(await accountResponse.json());
  if (parseAccountJson.success !== true) {
    throw text("Failed to parse Discord API's /oauth2/@me reponse", { status: 500 });
  }

  return parseAccountJson.data.user;
};
