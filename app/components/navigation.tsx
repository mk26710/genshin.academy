import type { FC } from "react";

import { Menu } from "@headlessui/react";
import { NavLink, useFetcher } from "@remix-run/react";
import { clsx } from "clsx";
import { useTranslations } from "use-intl";

import { useAvatarUrl } from "~/hooks/use-avatar-url";
import { useOptionalUser } from "~/hooks/use-optional-user";

const NAV_ROUTES = [
  {
    to: "/",
    i18n: { key: "common.home" },
  },
  {
    to: "/posts",
    i18n: { key: "common.posts" },
  },
  {
    to: "/characters",
    i18n: { key: "common.characters" },
  },
  {
    to: "/calculators",
    i18n: { key: "common.calculators" },
  },
  {
    to: "/settings",
    i18n: { key: "common.settings" },
  },
];

const USER_NAV_ROUTES = [
  {
    to: "/me",
    i18n: { key: "common.my-profile" },
  },
  {
    to: "/files",
    i18n: { key: "common.files" },
  },
  {
    to: "/posts/new",
    i18n: { key: "common.create-post" },
  },
];

export const UserAccount: FC = () => {
  const maybeUser = useOptionalUser();
  const avatarUrl = useAvatarUrl(maybeUser?.avatarUrl);

  const t = useTranslations();
  const fetcher = useFetcher();

  const onLogoutClick = () => {
    fetcher.submit(null, {
      method: "post",
      action: "/logout",
    });
  };

  if (maybeUser == null) {
    return null;
  }

  return (
    <div className="flex max-w-fit flex-1 flex-row items-center">
      <Menu as="div" className="relative flex h-full flex-1">
        <Menu.Button>
          <img src={avatarUrl} className=" h-10 w-10 rounded-full" />
        </Menu.Button>

        <Menu.Items
          as="div"
          className="absolute right-0 top-full mt-2 flex w-max origin-top-right flex-col rounded-box bg-white py-2 text-sm shadow"
        >
          {USER_NAV_ROUTES.map((route, idx) => (
            <Menu.Item key={idx}>
              <NavLink to={route.to} className={"py-2 px-4 hover:bg-gray-100"}>
                {t(route.i18n.key)}
              </NavLink>
            </Menu.Item>
          ))}
          <Menu.Item>
            <button onClick={onLogoutClick} className="flex items-start py-2 px-4">
              {t("common.logout")}
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export const DesktopNavigator: FC = () => {
  const t = useTranslations();

  return (
    <nav className="sticky top-0 hidden h-navbar flex-col bg-white px-4 shadow desktop:flex">
      <div className="mx-auto flex w-full max-w-content flex-1 flex-row">
        <ul className="flex flex-1 flex-row gap-6">
          {NAV_ROUTES.map((route, idx) => (
            <li key={idx} className="flex max-w-fit flex-1">
              <NavLink
                to={route.to}
                className={({ isActive }) =>
                  clsx(
                    "flex flex-1 items-center justify-center border-b-2 text-sm font-semibold",
                    isActive ? "text-black" : "text-gray-600",
                    isActive ? "border-primary-500" : "border-transparent",
                  )
                }
              >
                {t(route.i18n.key, { count: 99 })}
              </NavLink>
            </li>
          ))}
        </ul>

        <UserAccount />
      </div>
    </nav>
  );
};

export const MobileNavigator: FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 flex h-navbar w-screen flex-row bg-gray-300 desktop:hidden"></nav>
  );
};
