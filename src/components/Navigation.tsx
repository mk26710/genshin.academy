import type { FC, SVGProps } from "react";

import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/react/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useCallback } from "react";

type TIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

interface NavRoute {
  path: string;
  title: string;
  hasNested?: boolean;
  Icon: TIcon;
}

const navRoutes: NavRoute[] = [
  {
    path: "/",
    title: "Home",
    Icon: HomeIcon,
  },
  {
    path: "/characters",
    title: "Characters",
    hasNested: true,
    Icon: StarIcon,
  },
  {
    path: "/guides",
    title: "Guides",
    hasNested: true,
    Icon: BeakerIcon,
  },
  {
    path: "/calc",
    title: "Calculator",
    Icon: CalculatorIcon,
  },
];

export const Navigation: FC = () => {
  const router = useRouter();

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
    (navRoute: Omit<NavRoute, "Icon">) => {
      if (navRoute.hasNested === true) {
        return router.route.startsWith(navRoute.path);
      }

      return router.route === navRoute.path;
    },
    [router.route],
  );

  const activeClass = useCallback(
    (navRoute: Omit<NavRoute, "Icon">, isMobile = false) => {
      const active = isActive(navRoute);

      if (isMobile && active) {
        return "text-primary-500 dark:text-primary-400 font-bold";
      } else if (!isMobile && active) {
        return " !bg-primary-500 rounded-lg text-white";
      }

      return "";
    },
    [isActive],
  );

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <nav className="z-10 lg:hidden fixed bottom-0 left-0 h-[var(--mobile-navbar-height)] w-full border-t border-neutral-200 dark:border-dark-200/10 dark:bg-dark-800 bg-white select-none">
        <div className="dark:text-dark-400 flex flex-row h-full gap-4 px-4 justify-between overflow-y-auto">
          {navRoutes.map(({ Icon, ...navRoute }) => (
            <NextLink key={`mobile-navbar-${navRoute.path}`} href={navRoute.path}>
              <a
                className={`${activeClass(
                  navRoute,
                  true,
                )} flex-1 flex flex-col items-center justify-center`}
              >
                <Icon className="h-6 w-6 p-0" />
                <h1 className="text-sm font-semibold">{navRoute.title}</h1>
              </a>
            </NextLink>
          ))}

          {isMounted && (
            <div
              onClick={toggleDark}
              className="flex-1 flex flex-col items-center justify-center cursor-pointer"
            >
              {resolvedTheme === "dark" && <SunIcon className="w-6 h-6" />}
              {resolvedTheme !== "dark" && <MoonIcon className="w-6 h-6" />}
              <h1 className="text-sm font-semibold">
                {resolvedTheme === "dark" && "Light"}
                {resolvedTheme !== "dark" && "Dark"}
              </h1>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Sidebard */}
      <aside
        data-description="Desktop Sidebar Navigation"
        className="sidebar sticky top-0 hidden lg:flex flex-col min-h-screen max-h-screen"
      >
        <div className="overflow-y-auto ml-4 my-4 w-64 h-full rounded-lg border border-neutral-200 dark:border-dark-200/10 dark:bg-dark-800 bg-white">
          <div className="flex flex-col gap-y-2 p-4 w-full">
            <div className="self-center py-4 mb-2 border-b border-neutral-200 dark:border-dark-200/10">
              <h1 className="font-extrabold text-xl">GENSHIN.ZENLESS</h1>
            </div>

            {navRoutes.map(({ Icon, ...navRoute }) => (
              <NextLink key={navRoute.path} href={navRoute.path}>
                <a
                  className={
                    "w-full flex flex-row items-center gap-x-2 px-3 py-2 font-semibold text-lg cursor-pointer" +
                    activeClass(navRoute)
                  }
                >
                  <Fragment>
                    <Icon className="h-7 w-7 p-0" />
                  </Fragment>
                  <h1>{navRoute.title}</h1>
                </a>
              </NextLink>
            ))}
          </div>

          {isMounted && (
            <div className="fixed bottom-8 left-8">
              <div
                onClick={() => toggleDark()}
                className="transition-all duration-75 bg-neutral-100 dark:bg-dark-900 dark:text-dark-300 outline outline-1 outline-neutral-200 dark:outline-dark-200/10 rounded-lg flex items-center justify-center aspect-square h-8 cursor-pointer"
              >
                {resolvedTheme === "dark" && <SunIcon className="w-5 h-5" />}
                {resolvedTheme !== "dark" && <MoonIcon className="w-5 h-5" />}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
