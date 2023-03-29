import type { LoaderArgs } from "@remix-run/node";
import { Main } from "~/components/main";
import { useAvatarUrl } from "~/hooks/use-avatar-url";
import { useAfterHydration } from "~/hooks/use-hydrated";
import { useUser } from "~/hooks/use-user";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { requireUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);
  return null;
};

export default function Account() {
  const user = useUser();
  const avatarUrl = useAvatarUrl(user.avatarUrl);
  const createdAt = useAfterHydration(new Date(user.createdAt));

  const locale = useVisitorLocale();

  return (
    <Main>
      <Main.Container>
        <div className="daisy-card w-full max-w-lg self-center bg-base-200">
          <div className="daisy-card-body flex flex-col gap-2">
            <img
              src={avatarUrl}
              className="aspect-square h-32 w-32 self-center rounded-full object-cover"
            />
            <h2 className="self-center text-2xl font-bold">{user.name}</h2>

            <div className="daisy-divider"></div>

            <div>
              <h2 className="text-lg font-semibold">User ID</h2>
              <code className="font-mono">{user.id}</code>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Member Since</h2>
              <p>
                {createdAt != null && (
                  <>
                    {Intl.DateTimeFormat(locale, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(createdAt)}
                  </>
                )}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Permissions</h2>
              <div className="mt-1 flex flex-row flex-wrap gap-2">
                {user.permissions.map(({ value }, i) => (
                  <span key={i} className="daisy-badge-primary daisy-badge-outline daisy-badge">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Main.Container>
    </Main>
  );
}
