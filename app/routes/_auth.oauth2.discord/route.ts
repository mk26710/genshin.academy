import type { HeadersFunction, LoaderArgs } from "@remix-run/node";

import { getUserByDiscordAccount } from "~/models/user.server";
import { exchageDiscordCode, getDiscordAccount } from "~/utils/oauth/discord.server";
import { badRequest, unauthorized } from "~/utils/responses.server";
import { createUserSession } from "~/utils/session.server";
import { OAuathTypeSchema as OAuthTypeSchema } from "./validator.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

async function link_loader({ request }: LoaderArgs) {
  // TODO
  return null;
}

async function sigin({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const discordCode = url.searchParams.get("code");
  if (!discordCode) {
    throw badRequest({ message: "Discord OAuth code was not provided" });
  }

  const tokenData = await exchageDiscordCode(discordCode, { type: "login" });
  const discordAccount = await getDiscordAccount(tokenData.access_token);

  const user = await getUserByDiscordAccount(discordAccount.id);
  if (!user) {
    throw unauthorized({
      message: "There's is no user account associated with your Discord account.",
    });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: "/",
  });
}

export async function loader({ request, context, params }: LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const oauthType = await OAuthTypeSchema.parseAsync(searchParams.get("type"));

  if (oauthType === "signin") {
    return await sigin({ request, context, params });
  } else if (oauthType === "link") {
    return await link_loader({ request, context, params });
  }

  return null;
}
