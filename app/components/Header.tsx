import type { FunctionComponent, PropsWithChildren } from "react";

import { Menu } from "@headlessui/react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "use-intl";
import { Link, NavLink, useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useOptionalUser } from "~/hooks/use-optional-user";

const links = [
  {
    i18nKey: "common.home",
    path: "/",
  },
  {
    i18nKey: "common.posts",
    path: "/posts",
    hasNested: true,
  },
  {
    i18nKey: "common.guides",
    path: "/guides",
    hasNested: true,
  },
  {
    i18nKey: "common.calculators",
    path: "/calc",
  },
  {
    i18nKey: "common.characters",
    path: "/characters",
    hasNested: true,
  },
  {
    i18nKey: "common.settings",
    path: "/settings",
  },
];

const userMenuLinks = [
  {
    i18nKey: "common.my-profile",
    path: "/me",
  },
  {
    i18nKey: "common.create-post",
    path: "/posts/new",
  },
];

const UserMenu: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();
  const logoutFetcher = useFetcher();

  const handleLogout = async () => {
    logoutFetcher.submit(null, {
      action: "/logout",
      method: "post",
    });
  };

  return (
    <Menu>
      <Menu.Button>{children}</Menu.Button>
      <Menu.Items className="card fixed top-[calc(var(--header-height)_+_0.5rem)] flex flex-col bg-white px-0 py-2 font-medium shadow-lg">
        {userMenuLinks.map((link) => (
          <Menu.Item key={link.i18nKey}>
            <div className="h-8 w-full text-sm">
              <Link
                to={link.path}
                className="flex h-full w-full items-center px-4 text-neutral-600 transition-all duration-100 hover:bg-neutral-100 hover:text-black"
              >
                {t(link.i18nKey)}
              </Link>
            </div>
          </Menu.Item>
        ))}

        <Menu.Item>
          <div className="h-8 w-full text-sm">
            <button
              type="submit"
              className="flex h-full w-full items-center px-4 text-neutral-600 transition-all duration-100 hover:bg-neutral-100 hover:text-black"
              onClick={handleLogout}
            >
              {t("common.logout")}
            </button>
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export const Header = () => {
  const t = useTranslations();

  const location = useLocation();
  const maybeUser = useOptionalUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <header className="header">
        <div className="mx-auto flex h-full w-full max-w-[var(--max-content-width)] px-[var(--default-gap)]">
          <div className="hidden h-full lg:flex lg:flex-grow">
            {links.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className={({ isActive }) =>
                  "mr-4 flex h-full items-center border-b-2 border-transparent text-sm font-medium text-neutral-600 " +
                  (isActive ? "!border-black !text-black" : "")
                }
              >
                {t(link.i18nKey, { count: 99 })}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-grow flex-row-reverse items-center justify-end gap-2 lg:flex-grow-0 lg:flex-row">
            {maybeUser && <h3 className="text-sm font-medium text-gray-600">{maybeUser.name}</h3>}

            {maybeUser && (
              <UserMenu>
                {maybeUser.avatarUrl && (
                  <img
                    src={maybeUser.avatarUrl}
                    className="block h-7 w-7 rounded-full"
                    alt="Avatar"
                  />
                )}

                {!maybeUser.avatarUrl && (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary-500 to-blue-500" />
                )}
              </UserMenu>
            )}

            {!maybeUser && (
              <div className="flex h-full items-center lg:hidden">
                <Link to="/" className="text-sm font-medium">
                  genshin.zenless<span className="text-primary-500">.club</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex h-full lg:hidden">
            <button
              className="flex h-full items-center pl-6"
              onClick={() => setIsMenuOpen((s) => !s)}
            >
              {!isMenuOpen && <Bars3BottomRightIcon className="h-5 w-5" />}
              {isMenuOpen && <XMarkIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={
          "fixed top-[var(--header-height)] left-0 z-10 flex h-[var(--h-screen-without-header)] w-screen flex-col bg-white py-[var(--default-gap)] lg:hidden " +
          (isMenuOpen ? "flex" : "hidden")
        }
      >
        <h3 className="px-[var(--default-gap)] text-sm font-semibold uppercase text-gray-500">
          {t("common.navigation")}
        </h3>
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            className={({ isActive }) =>
              "flex h-12 items-center border-b px-[var(--default-gap)] text-sm font-medium text-neutral-700 hover:bg-gray-50 " +
              (isActive ? "!text-black" : "")
            }
          >
            {t(link.i18nKey, { count: 99 })}
          </NavLink>
        ))}
      </div>
    </>
  );
};
