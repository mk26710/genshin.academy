import { useRouter } from "next/router";
import NextLink from "next/link";
import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/react/outline";
import { FC, Fragment } from "react";

export const Navigation: FC = () => {
  const router = useRouter();

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

  return (
    <>
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

        <div className="fixed bottom-4 left-4">
          <div
            // @click="toggleDark()"
            className="transition-all duration-75 bg-neutral-200 dark:bg-dark-800 dark:text-neutral-300 rounded-lg flex items-center justify-center aspect-square h-8 cursor-pointer"
          >
            {/* <component :is="isDark ? SunIcon : MoonIcon" className="w-5 h-5" /> */}
          </div>
        </div>
      </aside>
    </>
  );
};
