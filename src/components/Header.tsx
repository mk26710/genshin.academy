import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    i18nKey: "common.characters",
    path: "/characters",
    hasNested: true,
  },
  {
    i18nKey: "common.settings",
    path: "/settings",
  },
];

type GenericLink = Record<string, unknown> & {
  path: string;
  hasNested?: boolean;
};

export const Header = () => {
  const t = useTranslations();
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (link: GenericLink) => {
    if (link.hasNested === true) {
      return router.asPath.toLowerCase().startsWith(link.path.toLowerCase());
    }

    return router.asPath.toLowerCase() === link.path.toLowerCase();
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [router.asPath]);

  return (
    <>
      <header className="header">
        <div className="mx-auto flex h-full w-full max-w-[var(--max-content-width)] px-[var(--default-gap)]">
          <div className="hidden h-full lg:flex lg:flex-grow">
            {links.map((link) => (
              <Link href={link.path} key={link.path}>
                <a
                  className={
                    "mr-4 flex h-full items-center border-b-2 border-transparent text-sm font-medium text-neutral-600 " +
                    (isActive(link) ? "!border-black !text-black" : "")
                  }
                >
                  {t(link.i18nKey, { count: 99 })}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex flex-grow flex-row-reverse items-center justify-end gap-2 lg:flex-grow-0 lg:flex-row">
            {session?.user?.name && (
              <h3 className="text-sm font-medium text-gray-600">{session.user.name}</h3>
            )}

            {session?.user?.image && (
              <img src={session.user.image} className="block h-7 w-7 rounded-full" alt="Avatar" />
            )}

            {!session?.user?.image && sessionStatus === "authenticated" && (
              <div className="h-7 w-7 rounded-full bg-gray-200" />
            )}

            {sessionStatus === "unauthenticated" && (
              <div className="flex h-full items-center lg:hidden">
                <Link href="/">
                  <a className="text-sm font-medium">
                    genshin.zenless<span className="text-primary-500">.club</span>
                  </a>
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
          <Link href={link.path} key={link.path}>
            <a
              className={
                "flex h-12 items-center border-b px-[var(--default-gap)] text-sm font-medium text-neutral-700 hover:bg-gray-50 " +
                (isActive(link) ? "!text-black" : "")
              }
            >
              {t(link.i18nKey, { count: 99 })}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};
