import type { FC, SVGProps } from "react";

import { BeakerIcon, CalculatorIcon, CogIcon, HomeIcon, StarIcon } from "@heroicons/react/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useCallback } from "react";

type TIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

interface NavRoute {
  path: string;
  i18nKey: string;
  hasNested?: boolean;
  prefetch?: false;
  Icon: TIcon;
}

const navRoutes: NavRoute[] = [
  {
    path: "/",
    i18nKey: "common:home",
    Icon: HomeIcon,
  },
  {
    path: "/characters",
    i18nKey: "common:characters",
    hasNested: true,
    Icon: StarIcon,
  },
  {
    path: "/guides",
    i18nKey: "common:guides",
    hasNested: true,
    Icon: BeakerIcon,
  },
  {
    path: "/calc",
    i18nKey: "common:calculators",
    Icon: CalculatorIcon,
  },
  {
    path: "/settings",
    i18nKey: "common:settings",
    prefetch: false,
    Icon: CogIcon,
  },
];

export const Navigation: FC = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [isMounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleDark = () => {
    // don't do anything unless it's client side
    if (!isMounted) return;

    if (resolvedTheme === "dark" && theme === "system") {
      setTheme("light");
    } else if (resolvedTheme === "light" && theme === "system") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = useCallback(
    (navRoute: Pick<NavRoute, "hasNested" | "path">) => {
      if (navRoute.hasNested === true) {
        return router.route.startsWith(navRoute.path);
      }

      return router.route === navRoute.path;
    },
    [router.route],
  );

  const activeClass = useCallback(
    (navRoute: Pick<NavRoute, "hasNested" | "path">, isMobile = false) => {
      const active = isActive(navRoute);

      if (isMobile && active) {
        return " text-primary-500 dark:text-primary-400 font-bold";
      } else if (!isMobile && active) {
        return " rounded-lg outline outline-1 outline-primary-200 dark:outline-primary-800 bg-primary-100 dark:bg-primary-900";
      }

      return "";
    },
    [isActive],
  );

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 z-10 h-[var(--mobile-navbar-height)] w-full select-none border-t border-neutral-200 bg-white text-[#000] dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300 lg:hidden">
        <div className="flex h-full flex-row justify-between gap-4 overflow-y-auto px-4 dark:text-dark-400">
          {navRoutes.map(({ Icon, i18nKey, prefetch, ...navRoute }) => (
            <NextLink
              key={`mobile-navbar-${navRoute.path}`}
              href={navRoute.path}
              prefetch={prefetch}
            >
              <a
                className={`${activeClass(
                  navRoute,
                  true,
                )} flex flex-1 flex-col items-center justify-center`}
              >
                <Icon className="h-6 w-6 stroke-2 p-0" />
                <h1 className="text-sm font-semibold">{t(i18nKey, { count: 0 })}</h1>
              </a>
            </NextLink>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebard */}
      <aside
        data-description="Desktop Sidebar Navigation"
        className="sidebar sticky top-0 hidden max-h-screen min-h-screen flex-col lg:flex"
      >
        <div className="my-4 ml-4 h-full w-64 overflow-y-auto rounded-lg border border-neutral-200 bg-white text-[#000] dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300">
          <div className="flex w-full flex-col gap-y-2 p-4">
            <div className="mb-2 self-center border-b border-neutral-200 py-4 dark:border-dark-200/10">
              <h1 className="text-xl font-extrabold">GENSHIN.ZENLESS</h1>
            </div>

            {navRoutes.map(({ Icon, i18nKey, prefetch, ...navRoute }) => (
              <NextLink key={navRoute.path} href={navRoute.path} prefetch={prefetch}>
                <a
                  className={
                    "flex w-full cursor-pointer flex-row items-center gap-x-2 px-3 py-2 text-lg font-semibold" +
                    activeClass(navRoute)
                  }
                >
                  <Fragment>
                    <Icon className="h-7 w-7 p-0" />
                  </Fragment>
                  <h1>{t(i18nKey, { count: 0 })}</h1>
                </a>
              </NextLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
