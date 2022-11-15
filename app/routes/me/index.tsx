import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useLocale } from "use-intl";

import { Container } from "~/components/Container";
import { UserAvatar } from "~/components/UserAvatar";
import { UserFlair } from "~/components/UserFlair";
import { useUser } from "~/hooks/use-user";
import { getLinkedAccountsById, unlinkDiscordAccountByUserId } from "~/models/user.server";
import { getDiscordLinkOAuthURL } from "~/utils/oauth/discord.server";
import { getAuthenticatedUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "me",
  withScrollRestoration: true,
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getAuthenticatedUser(request);
  const linkedAccounts = await getLinkedAccountsById(user.id);
  const discordOauthUrl = getDiscordLinkOAuthURL();
  return json({ user, linkedAccounts, discordOauthUrl });
};

export const action = async ({ request }: ActionArgs) => {
  const user = await getAuthenticatedUser(request);

  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "unlink.discord") {
    await unlinkDiscordAccountByUserId(user.id);
  }

  return null;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: `${data?.user.name} - GENSHIN.ACADEMY`,
  };
};

const MeRoute = () => {
  const locale = useLocale();
  const user = useUser();

  const { linkedAccounts, discordOauthUrl } = useLoaderData<typeof loader>();
  const discordAccount = linkedAccounts.find((acc) => acc.provider === "discord");

  const fetcher = useFetcher();

  const unlinkDiscordAccount = () => {
    const confirmed = confirm(
      `Are you 100% sure you want to unlink discord account with id ${discordAccount?.providerAccountId}?`,
    );

    if (confirmed) {
      fetcher.submit(new URLSearchParams({ action: "unlink.discord" }), { method: "patch" });
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center">
      <div className="card flex w-full flex-col gap-2 lg:w-96">
        <input type="text" name="currentUserId" value={user.id} hidden readOnly />

        <UserAvatar
          avatarUrl={user.avatarUrl}
          className="block h-[128px] w-[128px] self-center outline outline-1 outline-gray-300"
        />

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">
            <UserFlair
              text={user.flair?.text}
              fgColor={user.flair?.fgColor}
              bgColor={user.flair?.bgColor}
            />{" "}
            {user.name}
          </h2>
          <h6 className="text-xs opacity-40">ID: {user.id}</h6>
        </div>
        <div className="mt-4 grid auto-rows-min grid-cols-[auto_1fr] gap-x-2">
          <h1 className="font-semibold">Joined:</h1>
          <h2>{new Date(user.createdAt).toLocaleString(locale)}</h2>
        </div>
      </div>

      <div className="card mt-2 flex w-full flex-col gap-2 lg:w-96">
        <h3 className="text-sm font-bold uppercase">Linked accounts</h3>

        <div className="flex flex-row flex-wrap gap-2">
          <span className="flex-1">Discord</span>
          {discordAccount && (
            <button
              onClick={unlinkDiscordAccount}
              className="button button-neutral group disabled:cursor-not-allowed"
            >
              <span className="inline group-hover:hidden group-focus:hidden group-active:hidden">
                Linked
              </span>
              <span className="hidden group-hover:inline group-focus:inline group-active:inline">
                Unlink?
              </span>
            </button>
          )}
          {!discordAccount && (
            <a href={discordOauthUrl} rel="noreferrer" role="button" className="button">
              Link
            </a>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MeRoute;
