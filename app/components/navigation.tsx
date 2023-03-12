import type { FC } from "react";

import { Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalculatorIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink, useFetcher } from "@remix-run/react";
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
      action: "/signout",
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

export const HaderAndDesktopNav: FC = () => {
  const t = useTranslations();

  return (
    <header className="sticky top-0 flex h-navbar flex-col bg-white px-4 shadow">
      <nav className="mx-auto flex w-full max-w-content flex-1 flex-row">
        <ul className="hidden flex-1 flex-row gap-6 lg:flex">
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

        <div className="flex flex-1 items-center justify-center lg:hidden">
          <Link to="/" className="text-xl font-bold">
            genshin<span className="text-primary-700">.academy</span>
          </Link>
        </div>

        <UserAccount />
      </nav>
    </header>
  );
};

export const MobileNavigator: FC = () => {
  const t = useTranslations();

  // const [open, setOpen] = useState(false);

  // const closePopover = () => {
  //   setOpen(false);
  // };

  return (
    <Popover className="fixed right-4 bottom-4 flex flex-col-reverse lg:hidden">
      <Popover.Button className="w-fit self-end rounded-full bg-primary-500 p-4 opacity-50 shadow-lg transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-75 active:opacity-100 ui-open:opacity-100">
        <Bars3Icon className="h-5 w-5 text-white ui-open:hidden" />
        <XMarkIcon className="h-5 w-5 text-white ui-not-open:hidden" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="z-10 mb-2 w-max rounded-box bg-primary-500 shadow">
          <div className="grid grid-cols-1 gap-0 px-2 py-2 text-sm font-semibold">
            {NAV_ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                className={({ isActive }) =>
                  clsx(
                    "flex flex-row gap-2 rounded-box px-2 py-2 text-white",
                    isActive && "bg-primary-600",
                  )
                }
              >
                <r.Icon className="h-5 w-5" />
                <span>{t(r.i18n.key, { count: 99 })}</span>
              </NavLink>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
