import type { FC } from "react";

import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/react/outline";
import { MenuIcon, SunIcon, MoonIcon, XIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, type ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { useClickAway } from "react-use";

interface NavRoute {
  path: string;
  title: string;
  hasNested?: boolean;
  icon: ReactNode;
}

const navRoutes: NavRoute[] = [
  {
    path: `/`,
    title: `Home`,
    icon: <HomeIcon className="h-7 w-7 p-0" />,
  },
  {
    path: `/characters`,
    title: `Characters`,
    hasNested: true,
    icon: <StarIcon className="h-7 w-7 p-0" />,
  },
  {
    path: `/guides`,
    title: `Guides`,
    hasNested: true,
    icon: <BeakerIcon className="h-7 w-7 p-0" />,
  },
  {
    path: `/calc`,
    title: `Calculator`,
    icon: <CalculatorIcon className="h-7 w-7 p-0" />,
  },
];

export const Navigation: FC = () => {
  const router = useRouter();

  const [isMounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleDark = () => {
    // don't do anything unless it's client side
    if (!isMounted) return;

    if (resolvedTheme === `dark` && theme === `system`) {
      setTheme(`light`);
    } else if (resolvedTheme === `light` && theme === `system`) {
      setTheme(`dark`);
    } else {
      setTheme(`system`);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isOpen, setOpen] = useState(false);
  const popoverRef = useRef(null);

  const openPopever = () => {
    setOpen(true);
  };

  const closePopover = () => {
    setOpen(false);
  };

  useClickAway(popoverRef, () => {
    closePopover();
  });

  const isActive = useCallback(
    (navRoute: NavRoute) => {
      if (navRoute.hasNested === true) {
        return router.route.startsWith(navRoute.path);
      }

      return router.route === navRoute.path;
    },
    [router.route],
  );

  const activeClass = useCallback(
    (navRoute: NavRoute, isMobile = false) => {
      const active = isActive(navRoute);

      if (isMobile && active) {
        return ` bg-primary-600 text-white shadow-sm shadow-primary-300/50`;
      } else if (!isMobile && active) {
        return ` !bg-primary-600 rounded-lg text-white`;
      }

      return ``;
    },
    [isActive],
  );

  // firefox specific issue
  const mobileMarginBottom =
    isMounted && navigator.userAgent.toLowerCase().includes(`firefox`) ? `mb-10` : `mb-8`;

  return (
    <>
      {/* Mobile Navigation popover */}
      {isOpen && (
        <aside
          className={`fixed lg:hidden select-none mr-4 bottom-0 right-0 z-20 ${mobileMarginBottom}`}
        >
          <div
            className="bg-neutral-100 dark:bg-dark-900 box-border border border-neutral-200 dark:border-dark-200/20 rounded-lg p-2"
            ref={popoverRef}
          >
            <div className="flex flex-col gap-y-2 text-lg font-semibold">
              {isMounted && (
                <div
                  onClick={toggleDark}
                  className="px-3 py-2 border-b border-neutral-200 dark:border-dark-200/10 cursor-pointer"
                >
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-grow text-right">
                      {resolvedTheme === `dark` && `Light`}
                      {resolvedTheme !== `dark` && `Dark`}
                    </div>
                    <div>
                      {resolvedTheme === `dark` && <SunIcon className="w-6 h-6" />}
                      {resolvedTheme !== `dark` && <MoonIcon className="w-6 h-6" />}
                    </div>
                  </div>
                </div>
              )}

              {navRoutes.map((navRoute) => (
                <NextLink key={`${navRoute.title}-popover-item`} href={navRoute.path}>
                  <a className={`px-3 py-2 rounded-lg ${activeClass(navRoute, true)}`}>
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="flex-grow text-right">{navRoute.title}</div>
                      <div>{navRoute.icon}</div>
                    </div>
                  </a>
                </NextLink>
              ))}

              <div
                onClick={() => closePopover()}
                className="px-3 py-2 border-t border-neutral-200 dark:border-dark-200/10 cursor-pointer"
              >
                <div className="flex flex-row items-center gap-x-2">
                  <div className="flex-grow text-right">Close</div>
                  <div>
                    <XIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {!isOpen && (
        <aside
          onClick={() => openPopever()}
          className={`fixed lg:hidden select-none rounded-lg dark:text-dark-200/50 bg-neutral-100 dark:bg-dark-900 box-border border border-neutral-200 dark:border-neutral-200/10 shadow-lg cursor-pointer mr-4 bottom-0 right-0 z-10 ${mobileMarginBottom}`}
        >
          <MenuIcon className="w-6 h-6 m-3" />
        </aside>
      )}

      {/* Desktop Sidebard */}
      <aside
        data-description="Desktop Sidebar Navigation"
        className="sidebar sticky top-0 hidden lg:flex flex-col min-h-screen max-h-screen"
      >
        <div className="ml-4 my-4 w-64 h-full rounded-lg border border-neutral-200 dark:border-neutral-200/10 dark:bg-neutral-800 bg-white">
          <div className="flex flex-col gap-y-2 p-4 w-full">
            <div className="self-center py-4 mb-2 border-b border-neutral-200 dark:border-dark-200/10">
              <h1 className="font-extrabold text-xl">GENSHIN.ZENLESS</h1>
            </div>

            {navRoutes.map((navRoute) => (
              <NextLink key={navRoute.path} href={navRoute.path}>
                <a
                  className={
                    `w-full flex flex-row items-center gap-x-2 px-3 py-2 font-semibold text-lg cursor-pointer` +
                    activeClass(navRoute)
                  }
                >
                  <Fragment>{navRoute.icon}</Fragment>
                  <h1>{navRoute.title}</h1>
                </a>
              </NextLink>
            ))}
          </div>

          {isMounted && (
            <div className="fixed bottom-8 left-8">
              <div
                onClick={() => toggleDark()}
                className="transition-all duration-75 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300 outline outline-1 outline-neutral-200 dark:outline-neutral-200/10 rounded-lg flex items-center justify-center aspect-square h-8 cursor-pointer"
              >
                {resolvedTheme === `dark` && <SunIcon className="w-5 h-5" />}
                {resolvedTheme !== `dark` && <MoonIcon className="w-5 h-5" />}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
