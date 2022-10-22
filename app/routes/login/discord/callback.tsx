import type { LoaderArgs } from "@remix-run/node";

import { Link, useCatch } from "@remix-run/react";

import { Container } from "~/components/Container";
import { getUserByDiscordAccount } from "~/models/user.server";
import { exchageDiscordCode, getDiscordAccount } from "~/oauth/discord.server";
import { text } from "~/utils/responses.server";
import { createUserSession } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const discordCode = url.searchParams.get("code");
  if (!discordCode) {
    throw text("Discord OAuth code was not provided.", { status: 400 });
  }

  const tokenData = await exchageDiscordCode(discordCode, { type: "login" });
  const discordAccount = await getDiscordAccount(tokenData.access_token);

  const user = await getUserByDiscordAccount(discordAccount.id);
  if (!user) {
    throw text("There's is no user account associated with your Discord account.", { status: 401 });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: "/me",
  });
}

export default function LoginDiscordCallbackRoute() {
  return <Container>Logging in...</Container>;
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Container className="flex flex-col items-center justify-center" withScrollRestoration>
      <h1 className="text-4xl font-bold">{caught.status}</h1>
      <h4 className="opacity-70">{caught.statusText ?? caught.data}</h4>

      <Link to="/login" role="button" className="button mt-4">
        Back to login
      </Link>
    </Container>
  );
}
