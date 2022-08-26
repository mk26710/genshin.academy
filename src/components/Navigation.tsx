import type { FunctionComponent, SVGProps } from "react";

import {
  CalculatorIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

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
    path: "/guides",
    i18nKey: "common:guides",
    hasNested: true,
    Icon: DocumentTextIcon,
  },
  {
    path: "/characters",
    i18nKey: "common:characters",
    hasNested: true,
    Icon: UserGroupIcon,
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
    Icon: Cog6ToothIcon,
  },
];

export const Navigation: FunctionComponent = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const isActive = useCallback(
    (navRoute: Pick<NavRoute, "hasNested" | "path">) => {
      if (navRoute.hasNested === true) {
        return router.route.startsWith(navRoute.path);
      }

      return router.route === navRoute.path;
    },
    [router.route],
  );

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 z-10 h-[var(--mobile-navbar-height)] w-full select-none border-t border-gray-200 bg-white text-[#000] lg:hidden">
        <div className="flex h-full flex-row justify-between gap-4 overflow-y-auto px-4">
          {navRoutes.map(({ Icon, i18nKey, prefetch, ...navRoute }) => (
            <NextLink
              key={`mobile-navbar-${navRoute.path}`}
              href={navRoute.path}
              prefetch={prefetch}
            >
              <a
                data-active={isActive(navRoute)}
                className={`flex flex-1 flex-col items-center justify-center active:text-primary-500`}
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
        <div className="my-4 h-full w-56 overflow-y-auto rounded-lg">
          <div className="flex w-full flex-col gap-y-1 pb-6">
            <div className="mb-4 mt-2 self-center">
              <NextLink href="/">
                <a className="font-semibold">
                  genshin.zenless
                  <span className="text-xs text-primary-700">.club</span>
                </a>
              </NextLink>
            </div>

            {navRoutes.map(({ Icon, i18nKey, prefetch, ...navRoute }) => (
              <NextLink key={navRoute.path} href={navRoute.path} prefetch={prefetch}>
                <a
                  data-active={isActive(navRoute)}
                  className="box-border flex items-center rounded-lg border border-transparent px-4 py-2 text-gray-700 active:border-primary-700 active:bg-primary-100  active:text-primary-700"
                >
                  <Icon className="h-5 w-5 opacity-75" />

                  <span className="ml-3 text-sm font-medium"> {t(i18nKey, { count: 0 })} </span>
                </a>
              </NextLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
