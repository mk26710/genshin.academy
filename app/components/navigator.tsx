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
import { Link, NavLink, useFetcher, useMatches } from "@remix-run/react";
import { clsx } from "clsx";
import type { FC } from "react";
import { Fragment } from "react";
import { useTranslations } from "use-intl";
import { useAvatarUrl } from "~/hooks/use-avatar-url";
import { useOptionalUser } from "~/hooks/use-optional-user";
import type { RouteHandle } from "~/types/common";

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
          <img src={avatarUrl} className="h-10 w-10 rounded-full" />
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
            className="absolute right-0 top-full mt-6 flex max-w-[200px] origin-top-right flex-col rounded-box bg-base-200 p-2 text-sm shadow"
          >
            {USER_NAV_ROUTES.map((route, idx) => (
              <Menu.Item key={idx}>
                <NavLink to={route.to} className={"daisy-btn-ghost daisy-btn"}>
                  {t(route.i18n.key)}
                </NavLink>
              </Menu.Item>
            ))}

            <Menu.Item>
              <button onClick={onLogoutClick} className="daisy-btn-ghost daisy-btn">
                {t("common.logout")}
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const Navbar: FC = () => {
  const maybeUser = useOptionalUser();
  const t = useTranslations();

  const matches = useMatches();
  const hideSearch = matches.some(
    (m) => m.handle != null && (m.handle as RouteHandle).hasSearch === true,
  );

  return (
    <div className="sticky top-0 left-0 z-50 lg:h-navbar-container lg:px-4 lg:pt-4">
      <header className="h-navbar bg-base-200/80 text-base-content backdrop-blur-md lg:rounded-box">
        <div className="daisy-navbar mx-auto w-full max-w-content px-4 xl:px-0">
          <div className="flex flex-1 items-center justify-center gap-x-1 lg:hidden">
            <Link to="/" className="text-xl font-bold">
              genshin<span className="text-primary">.academy</span>
            </Link>
          </div>

          <div className="hidden items-center gap-x-1 lg:flex">
            <Link to="/" className="text-xl font-bold">
              genshin<span className="text-primary">.academy</span>
            </Link>
          </div>

          <div className="ml-2 hidden flex-1 items-center gap-x-1 lg:flex">
            {NAV_ROUTES.filter(({ i18n }) => i18n.key !== "common.home").map(({ to, i18n }) => (
              <Link to={to} key={to} className="daisy-btn-ghost daisy-btn ">
                {t(i18n.key, { count: 99 })}
              </Link>
            ))}
          </div>

          <div className="flex-none gap-2">
            <div
              className={clsx(
                "daisy-form-control hidden lg:flex",
                hideSearch === true ? "!hidden" : null,
              )}
            >
              <input
                type="text"
                placeholder="Search"
                className="daisy-input-bordered daisy-input max-w-[200px]"
              />
            </div>

            {maybeUser != null && <UserAccount />}

            {/* <div className="daisy-dropdown-end daisy-dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="daisy-badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
          </div>
        </div>
      </header>
    </div>
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
      <Popover.Button className="w-fit self-end rounded-full bg-[#000000] p-4  opacity-50 shadow-lg transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-75 active:opacity-100 ui-open:opacity-100">
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
        <Popover.Panel className="z-10 mb-2 w-max rounded-box bg-[#000000] shadow">
          <div className="grid grid-cols-1 gap-0 px-2 py-2 text-sm font-semibold">
            {NAV_ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                className={({ isActive }) =>
                  clsx(
                    "flex flex-row gap-2 rounded-box px-2 py-2 text-white",
                    isActive && "bg-[#202020]",
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
