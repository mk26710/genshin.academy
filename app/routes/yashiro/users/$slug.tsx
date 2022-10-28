import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";

import { NavLink, useCatch, useLoaderData, useOutlet } from "@remix-run/react";

import { Container } from "~/components/Container";
import { UserAvatar } from "~/components/UserAvatar";
import { getUserByNameOrId } from "~/models/user.server";
import { orUndefined } from "~/utils/helpers";
import { generateMeta } from "~/utils/meta-generator";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.user.parent",
  withScrollRestoration: true,
};

export const loader = async ({ request, params }: LoaderArgs) => {
  await ensureAuthorizedUser(request, async (user) =>
    validateUserPermissions(user, permissions("EDIT_USER"), ValidationMode.SOFT),
  );

  if (typeof params?.slug !== "string") {
    throw text("Something went wrong with the slug.", { status: 500 });
  }

  const user = await getUserByNameOrId(params.slug);
  if (!user) {
    throw text("User not found.", { status: 404 });
  }

  return { user };
};

export type Loader = SerializeFrom<typeof loader>;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.user) {
    return generateMeta({
      title: "User not found",
    });
  }

  return generateMeta({
    title: data.user.name,
    imageUrl: orUndefined(data.user.avatarUrl),
  });
};

export type ContextType = Loader;

export default function YashiroUsersSlugLayoutRoute() {
  const loaderData = useLoaderData() as Loader;
  const { user } = loaderData;

  const outlet = useOutlet(loaderData);

  return (
    <Container>
      <NavLink to="/yashiro/users">Browse users</NavLink>
      <div className="mt-4 flex h-12 flex-row divide-x divide-[var(--default-border-color)] border border-b-0 px-[var(--default-gap)] lg:rounded-t-md">
        <NavLink
          to="./overview"
          className={"flex items-center justify-center pr-4 text-sm font-semibold uppercase "}
        >
          Overview
        </NavLink>

        <NavLink
          to="./permissions"
          className={"flex items-center justify-center pl-4 text-sm font-semibold uppercase "}
        >
          Permission Flags
        </NavLink>
      </div>
      <div className="card grid grid-cols-1 gap-2 rounded-t-none lg:grid-cols-[auto_1fr] lg:flex-row">
        <div className="flex w-full flex-col gap-2 lg:w-52">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            className="aspect-square h-32 w-32 self-center border border-[var(--default-border-color)]"
          />
          <h3 className="self-center text-lg font-bold">{user.name}</h3>
          <button className="button border-red-600 bg-red-600 hover:text-red-600">
            Delete User (no workie)
          </button>
        </div>

        {outlet}
      </div>
    </Container>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-8xl font-bold">{caught.status}</h3>
        <p className="opacity-70">{caught.statusText}</p>
      </div>
    </Container>
  );
};
