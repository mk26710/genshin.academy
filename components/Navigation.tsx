import { useRouter } from "next/router";
import NextLink from "next/link";
import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/react/outline";
import { MenuIcon, SunIcon, MoonIcon, XIcon } from "@heroicons/react/solid";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useTheme } from "next-themes";

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

  const paths = [
    {
      path: "/",
      title: "Home",
      icon: <HomeIcon className="h-7 w-7 p-0" />,
    },
    {
      path: "/characters",
      title: "Characters",
      icon: <StarIcon className="h-7 w-7 p-0" />,
    },
    {
      path: "/guides",
      title: "Guides",
      icon: <BeakerIcon className="h-7 w-7 p-0" />,
    },
    {
      path: "/calc",
      title: "Calculator",
      icon: <CalculatorIcon className="h-7 w-7 p-0" />,
    },
  ];

  const activeClass = (routePath: string) =>
    router.pathname === routePath
      ? " !bg-primary-600 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md text-white"
      : "";

  const mobileActiveClass = (routePath: string) =>
    router.pathname === routePath
      ? " bg-primary-600 text-white shadow-sm shadow-primary-300/50"
      : "";

  // firefox specific issue
  const mobileMarginBottom =
    isMounted && navigator.userAgent.toLowerCase().includes("firefox") ? "mb-10" : "mb-8";

  return (
    <>
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
                      {resolvedTheme === "dark" && 'Dark'}
                      {resolvedTheme !== "dark" && 'Light'}
                    </div>
                    <div>
                      {resolvedTheme === "dark" && <SunIcon className="w-6 h-6" />}
                      {resolvedTheme !== "dark" && <MoonIcon className="w-6 h-6" />}
                    </div>
                  </div>
                </div>
              )}

              {paths.map(({ path, title, icon }) => (
                <NextLink key={`${title}-popover-item`} href={path}>
                  <a className={`px-3 py-2 rounded-lg ${mobileActiveClass(path)}`}>
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="flex-grow text-right">{title}</div>
                      <div>{icon}</div>
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

      {/* <!-- Desktop Sidebard --> */}
      <aside
        data-description="Desktop Sidebar Navigation"
        className="sidebar hidden lg:flex flex-col w-64 border-r border-neutral-200 dark:border-neutral-200/10 dark:bg-neutral-800 bg-white h-full"
      >
        <div className="flex flex-col gap-y-2 sticky top-0 p-4 w-full">
          <div className="self-center py-4 mb-2 border-b border-neutral-200 dark:border-dark-200/10">
            <h1 className="font-extrabold text-xl">GENSHIN.ZENLESS</h1>
          </div>

          {paths.map(({ path, title, icon }) => (
            <NextLink key={path} href={path}>
              <a
                className={
                  "w-full flex flex-row items-center gap-x-2 px-3 py-2 font-semibold text-lg cursor-pointer" +
                  activeClass(path)
                }
              >
                <Fragment>{icon}</Fragment>
                <h1>{title}</h1>
              </a>
            </NextLink>
          ))}
        </div>

        {isMounted && (
          <div className="fixed bottom-4 left-4">
            <div
              onClick={() => toggleDark()}
              className="transition-all duration-75 bg-neutral-200 dark:bg-dark-800 dark:text-neutral-300 rounded-lg flex items-center justify-center aspect-square h-8 cursor-pointer"
            >
              {resolvedTheme === "dark" && <SunIcon className="w-5 h-5" />}
              {resolvedTheme !== "dark" && <MoonIcon className="w-5 h-5" />}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
