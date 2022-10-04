import { Square2StackIcon } from "@heroicons/react/20/solid";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLocale } from "use-intl";
import { Container } from "~/components/Container";
import { RoleBadge } from "~/components/RoleBadge";
import { useUser } from "~/hooks/use-user";
import { ensureAuthenticatedUser } from "~/utils/session.server";

type LoaderData = typeof loader;

export const loader = async ({ request }: LoaderArgs) => {
  const user = await ensureAuthenticatedUser(request);
  return json({ user });
};

export const meta: MetaFunction<LoaderData> = ({ data }) => {
  const { user } = data;

  return {
    title: `${user.name} - GENSHIN.ZENLESS`,
  };
};

const MeRoute = () => {
  const locale = useLocale();
  const user = useUser();

  const copyUserIdToClipboard = () => {
    if (navigator != null) {
      navigator.clipboard.writeText(user.id);
    }
  };

  return (
    <Container className="grid place-items-center">
      <div className="card flex w-full flex-col gap-2 pt-2 lg:w-96">
        <input type="text" name="currentUserId" value={user.id} hidden readOnly />

        <div className="mb-4 grid w-fit grid-cols-[auto_auto_auto] grid-rows-1 text-sm dark:text-neutral-600">
          <p>ID:</p>
          <p className="ml-1 mr-4">{user.id}</p>
          <div className="relative">
            <button onClick={copyUserIdToClipboard} className="peer">
              <Square2StackIcon className="h-5 w-5 hover:opacity-60 active:opacity-40" />
            </button>
            <span className="absolute bottom-6 -left-7 ml-4 rounded bg-black px-2 py-1.5 text-xs font-medium text-white opacity-0 peer-hover:opacity-100 lg:bottom-8">
              Copy
            </span>
          </div>
        </div>

        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            width="128"
            height="128"
            alt={`${user.name}'s avatar`}
            className="self-center rounded-full"
          />
        )}

        <h1 className="self-center text-xl font-semibold">{user.name}</h1>
        <div className="mt-4 grid auto-rows-min grid-cols-[auto_1fr] gap-x-2">
          <h1 className="font-semibold">Roles:</h1>
          <h2>
            {user.roles.map((role, i) => (
              <span key={i}>
                <RoleBadge role={role.title} />{" "}
              </span>
            ))}
          </h2>

          <h1 className="font-semibold">Joined:</h1>
          <h2>{new Date(user.createdAt).toLocaleString(locale)}</h2>
        </div>
      </div>
    </Container>
  );
};

export default MeRoute;
