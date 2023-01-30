import type { ChangeEvent } from "react";
import type { RouteHandle } from "~/types/common";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useFetcher, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import { useId } from "react";
import { useTranslations } from "use-intl";

import { colorSchemeAtom } from "~/atoms/color-scheme";
import { Main } from "~/components/Main";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { isColorScheme } from "~/utils/color-scheme/common";
import { supportedLocales } from "~/utils/locales";

const LANG_CODE_TO_NAME = {
  ru: "Русский",
  en: "English",
};

export const handle: RouteHandle = {
  id: "settings",
  withScrollRestoration: true,
};

const SettingsRoute = () => {
  const id = useId();

  const t = useTranslations();
  const locale = useVisitorLocale();

  const location = useLocation();
  const fetcher = useFetcher();

  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);

  const handleLocaleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    fetcher.submit(null, {
      action: `/set-locale/${e.target.value}?redirect=${location.pathname}`,
      method: "patch",
    });
  };

  const handleColorSchemeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!isColorScheme(e.target.value)) {
      console.warn("Tried to set color scheme to an unsupported theme");
      return;
    }

    setColorScheme(e.target.value);

    const formData = new FormData();

    formData.set("colorScheme", e.target.value);
    formData.set("redirectTo", "/settings");

    fetcher.submit(formData, {
      action: "/set-color-scheme",
      method: "post",
    });
  };

  return (
    <Main>
      <Main.Container>
        <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3  ">
          <div className="rounded-box border border-gray-200 bg-white px-4 py-5 shadow sm:p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Color Scheme</h3>

            <fieldset role="radiogroup" className="flex gap-2">
              <div>
                <input
                  id={id + "dark:"}
                  type="radio"
                  name="color-scheme"
                  className="peer sr-only"
                  value="dark"
                  checked={colorScheme === "dark"}
                  onChange={handleColorSchemeChange}
                />
                <label
                  htmlFor={id + "dark:"}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-box border-2 border-gray-400 p-2 font-medium text-gray-400 peer-checked:border-primary-500 peer-checked:text-primary-500"
                >
                  <MoonIcon className="h-6 w-6" />
                  <span>Dark</span>
                </label>
              </div>

              <div>
                <input
                  id={id + "light:"}
                  type="radio"
                  name="color-scheme"
                  className="peer sr-only"
                  value="light"
                  checked={colorScheme === "light"}
                  onChange={handleColorSchemeChange}
                />
                <label
                  htmlFor={id + "light:"}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-box border-2 border-gray-400 p-2 font-medium text-gray-400 peer-checked:border-primary-500 peer-checked:text-primary-500"
                >
                  <SunIcon className="h-6 w-6" />
                  <span>Light</span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="rounded-box border border-gray-200 bg-white px-4 py-5 shadow sm:p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">{t("settings.language")}</h3>

            <fieldset role="radiogroup" className="flex gap-2">
              {supportedLocales.map((code, idx) => (
                <div key={idx}>
                  <input
                    id={id + code + ":"}
                    type="radio"
                    name="locale"
                    className="peer sr-only"
                    value={code}
                    checked={locale === code}
                    onChange={handleLocaleChange}
                  />
                  <label
                    htmlFor={id + code + ":"}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-box border-2 border-gray-400 p-2 font-medium text-gray-400 peer-checked:border-primary-500 peer-checked:text-primary-500"
                  >
                    <span>{LANG_CODE_TO_NAME[code]}</span>
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
      </Main.Container>
    </Main>
  );
};

export default SettingsRoute;
