import type { ChangeEvent } from "react";
import type { RouteHandle } from "~/types/common";

import { useFetcher, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import { generatePath } from "react-router";
import { useTranslations } from "use-intl";

import { colorSchemeAtom } from "~/atoms/color-scheme";
import { Container } from "~/components/Container";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { isColorScheme, SUPPORTED_COLOR_SCHEMES } from "~/utils/color-scheme/common";
import { supportedLocales } from "~/utils/locales";

export const handle: RouteHandle = {
  id: "settings",
  withScrollRestoration: true,
};

const SettingsRoute = () => {
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
    <Container>
      <div className="w-full">
        <h1 className="mb-2 font-semibold">Color Scheme</h1>

        <fieldset role="radiogroup" className="flex flex-col gap-1">
          {SUPPORTED_COLOR_SCHEMES.map((cs) => (
            <div key={cs}>
              <input
                id={`${cs}-btn`}
                type="radio"
                name="color-scheme"
                value={cs}
                checked={colorScheme === cs}
                onChange={handleColorSchemeChange}
                className="peer sr-only"
              />
              <label
                htmlFor={`${cs}-btn`}
                className="radio-field text-neutral-600 peer-checked:border-neutral-900 peer-checked:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:peer-checked:border-white dark:peer-checked:text-white"
              >
                <div className="font-medium">{cs}</div>
              </label>
            </div>
          ))}
        </fieldset>

        <h1 className="mb-2 mt-4 font-semibold">{t("settings.language")}</h1>

        <fieldset role="radiogroup" className="flex flex-col gap-1">
          {supportedLocales.map((code) => (
            <div key={code}>
              <input
                id={`${code}-btn`}
                type="radio"
                name="locales"
                value={code}
                checked={locale === code}
                onChange={handleLocaleChange}
                className="peer sr-only"
              />
              <label
                htmlFor={`${code}-btn`}
                className="radio-field gap-2 text-neutral-600 peer-checked:border-neutral-900 peer-checked:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:peer-checked:border-white dark:peer-checked:text-white"
              >
                <div className="align-middle">*flag here*</div>
                <div className="font-medium">{code}</div>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </Container>
  );
};

export default SettingsRoute;
