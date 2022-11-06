import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Form, NavLink } from "@remix-run/react";
import clsx from "clsx";
import { Fragment } from "react";
import { generatePath } from "react-router";
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
    i18nKey: "common.create-post",
    href: "/posts/new",
  },
];

export function Navbar() {
  const t = useTranslations();

  const maybeUser = useOptionalUser();
  const visitorLocale = useVisitorLocale();

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-neutral-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--default-gap)] ">
            <div className="relative flex h-[var(--header-height)] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">{/* there should be a log */}</div>
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(({ i18nKey, href }) => (
                      <NavLink
                        key={i18nKey}
                        to={generatePath(href, { visitorLocale })}
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? "bg-neutral-900 text-white"
                              : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )
                        }
                      >
                        {t(i18nKey, { count: 99 })}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {maybeUser != null && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                        <span className="sr-only">Open user menu</span>
                        <UserAvatar
                          avatarUrl={maybeUser.avatarUrl}
                          className="h-8 w-8 rounded-full bg-neutral-700"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map(({ i18nKey, href }) => (
                          <Menu.Item key={i18nKey}>
                            <NavLink
                              to={href}
                              className={({ isActive }) =>
                                clsx(
                                  isActive ? "bg-neutral-100" : "",
                                  "block px-4 py-2 text-sm text-neutral-700",
                                )
                              }
                            >
                              {t(i18nKey)}
                            </NavLink>
                          </Menu.Item>
                        ))}

                        <Menu.Item>
                          <Form>
                            <button className="block px-4 py-2 text-sm text-neutral-700">
                              {t("common.logout")}
                            </button>
                          </Form>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="fixed top-[var(--header-height)] left-0 w-full bg-neutral-800 sm:hidden ">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(({ i18nKey, href }) => (
                <Disclosure.Button key={i18nKey} as={Fragment}>
                  <NavLink
                    to={generatePath(href, { visitorLocale })}
                    className={({ isActive }) =>
                      clsx(
                        isActive
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-300 hover:bg-neutral-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium",
                      )
                    }
                  >
                    {t(i18nKey, { count: 99 })}
                  </NavLink>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
