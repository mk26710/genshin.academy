import { Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Form, NavLink } from "@remix-run/react";
import clsx from "clsx";
import { Fragment } from "react";
import { useTranslations } from "use-intl";

import { UserAvatar } from "~/components/UserAvatar";
import { useOptionalUser } from "~/hooks/use-optional-user";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";

const navigation = [
  {
    i18nKey: "common.home",
    href: "/",
  },
  {
    i18nKey: "common.posts",
    href: "/posts?lang=:visitorLocale",
    hasNested: true,
  },
  {
    i18nKey: "common.calculators",
    href: "/calc",
  },
  {
    i18nKey: "common.characters",
    href: "/characters",
    hasNested: true,
  },
  {
    i18nKey: "common.settings",
    href: "/settings",
  },
];

const userNavigation = [
  {
    i18nKey: "common.my-profile",
    href: "/me",
  },
  {
    i18nKey: "common.files",
    href: "/files",
  },
  {
    i18nKey: "common.create-post",
    href: "/posts/new",
  },
];

export function Navbar() {
  const t = useTranslations();

  const maybeUser = useOptionalUser();
  const visitorLocale = useVisitorLocale();

  return (
    <nav className="sticky top-0 z-50 h-[var(--header-height)] border-b border-gray-300 bg-white text-sm">
      <div className="relative mx-auto flex h-full w-full max-w-[var(--max-content-width)] flex-row">
        <div className="flex h-full flex-1  lg:hidden">
          <Menu>
            {({ open }) => (
              <Fragment>
                <Menu.Button className="px-4">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars2Icon className="h-6 w-6" />}
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
                    className="fixed top-[calc(var(--header-height)-1px)] left-0 z-40 flex h-fit w-full flex-col space-y-1 border-b border-gray-300 bg-white px-2 pt-2 pb-3 text-base"
                  >
                    {navigation.map(({ href, i18nKey }) => (
                      <NavLink
                        key={i18nKey}
                        to={href.replaceAll(":visitorLocale", visitorLocale)}
                        className={({ isActive }) =>
                          clsx(
                            "rounded-md px-3 py-2 font-medium text-gray-700",
                            isActive && "bg-gray-200 text-black ",
                          )
                        }
                      >
                        {t(i18nKey, { count: 99 })}
                      </NavLink>
                    ))}
                  </Menu.Items>
                </Transition>
              </Fragment>
            )}
          </Menu>
        </div>

        <ul className="hidden h-full flex-1 flex-row gap-2 px-4 lg:flex">
          {navigation.map(({ href, i18nKey }) => (
            <li key={i18nKey} className="flex h-full">
              <NavLink
                to={href.replaceAll(":visitorLocale", visitorLocale)}
                className={({ isActive }) =>
                  clsx(
                    "self-center rounded-md py-1.5 px-3.5  font-semibold",
                    isActive ? "bg-neutral-100 text-black" : "text-neutral-600",
                  )
                }
              >
                {t(i18nKey, { count: 99 })}
              </NavLink>
            </li>
          ))}
        </ul>

        {maybeUser != null && (
          <Menu as="div" className="relative flex items-center pr-[var(--default-gap)]">
            <Menu.Button>
              <UserAvatar
                avatarUrl={maybeUser.avatarUrl}
                className="aspect-square h-8 w-8 border border-gray-300 bg-gray-100 object-cover"
              />
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
              <Menu.Items className="absolute right-0 top-0 z-50 mt-[calc(var(--header-height)_+_0.5rem)] flex min-w-[200px] flex-col rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 shadow-lg">
                {userNavigation.map(({ href, i18nKey }) => (
                  <Menu.Item key={i18nKey} as={NavLink} to={href} className="px-4 py-2">
                    {t(i18nKey, { count: 99 })}
                  </Menu.Item>
                ))}

                <Menu.Item as={Form} action="/logout" method="post" className="px-4 py-2">
                  <button type="submit" className="flex h-full w-full items-center">
                    {t("common.logout")}
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>
    </nav>
  );
}
