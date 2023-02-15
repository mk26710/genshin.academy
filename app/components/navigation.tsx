import type { FC } from "react";

import { Menu, Transition } from "@headlessui/react";
import {
  CalculatorIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { NavLink, useFetcher } from "@remix-run/react";
import { clsx } from "clsx";
import { Fragment } from "react";
import { useTranslations } from "use-intl";

import { useAvatarUrl } from "~/hooks/use-avatar-url";
import { useOptionalUser } from "~/hooks/use-optional-user";

const NAV_ROUTES = [
  {
    to: "/",
    i18n: { key: "common.home" },
    Icon: HomeIcon,
  },
  {
    to: "/posts",
    i18n: { key: "common.posts" },
    Icon: DocumentTextIcon,
  },
  {
    to: "/characters",
    i18n: { key: "common.characters" },
    Icon: UsersIcon,
  },
  {
    to: "/calculators",
    i18n: { key: "common.calculators" },
    Icon: CalculatorIcon,
  },
  {
    to: "/settings",
    i18n: { key: "common.settings" },
    Icon: Cog6ToothIcon,
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
      action: "/sign-out",
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

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
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
        </Transition>
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
  const t = useTranslations();

  return (
    <nav className="fixed bottom-0 left-0 flex h-navbar w-screen flex-row justify-evenly overflow-y-auto bg-white px-2 shadow-[0_0_6px_-1px_rgb(0_0_0_/_0.1),_0_0_4px_-2px_rgb(0_0_0_/_0.1)] overflow-overlay desktop:hidden">
      {NAV_ROUTES.map(({ to, i18n, Icon }, idx) => (
        <NavLink
          key={idx + ":mobilenav"}
          to={to}
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center justify-center px-2 ",
              isActive ? "text-primary-500" : "text-gray-600",
            )
          }
        >
          <Icon className="h-5 w-5" />
          <h4 className="text-sm font-medium">{t(i18n.key, { count: 99 })}</h4>
        </NavLink>
      ))}
    </nav>
  );
};
