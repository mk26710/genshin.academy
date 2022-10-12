import type { ChangeEvent } from "react";

import { useFetcher } from "@remix-run/react";
import { generatePath, useLocation } from "react-router";
import { useTranslations } from "use-intl";

import { Container } from "~/components/Container";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { supportedLocales } from "~/utils/locales";

const SettingsRoute = () => {
  const t = useTranslations();
  const locale = useVisitorLocale();
  const location = useLocation();

  const fetcher = useFetcher();

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const actionPath = generatePath("/set-locale/:locale?redirect=:redirect", {
      locale: e.target.value,
      redirect: location.pathname,
    });

    fetcher.submit(null, {
      action: actionPath,
      method: "patch",
    });
  };

  return (
    <Container>
      <div className="w-full">
        <h1 className="mb-2 font-semibold">{t("settings.language")}</h1>

        <fieldset role="radiogroup" className="flex flex-col gap-1">
          {supportedLocales.map((code) => (
            <div key={code}>
              <input
                id={`${code}-btn`}
                type="radio"
                name="locales"
                value={code}
                checked={locale === code}
                onChange={handleOnChange}
                className="peer sr-only"
              />
              <label
                htmlFor={`${code}-btn`}
                className="border-[var(--default-border-color)] flex flex-row gap-2 rounded-md border px-3 py-2 text-gray-700 hover:cursor-pointer peer-checked:border-black peer-checked:text-black"
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
