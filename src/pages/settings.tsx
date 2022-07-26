import type { NextPage } from "next";
import type { ChangeEvent, FunctionComponent, PropsWithChildren } from "react";

import { DesktopComputerIcon, MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import ReactCountryFlag from "react-country-flag";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const locales = [
  {
    code: "en",
    flag: "GB",
    name: "English",
  },
  {
    code: "ru",
    flag: "RU",
    name: "Русский",
  },
];

const LanguageSwitch: FunctionComponent = () => {
  const { t, lang } = useTranslation();

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof document !== "undefined") {
      // create NEXT_LOCALE for 90 days
      document.cookie = `NEXT_LOCALE=${e.target.value};max-age=7776000;path=/;SameSite=Strict;`;
    }

    await setLanguage(e.target.value);
  };

  return (
    <div className="w-full">
      <h1 className="mb-2 text-lg font-semibold">{t`settings:language`}</h1>

      <fieldset role="radiogroup" className="flex flex-col gap-1">
        {locales.map(({ code, name, flag }) => (
          <div key={code}>
            <input
              id={`${code}-btn`}
              type="radio"
              name="locales"
              value={code}
              checked={lang === code}
              onChange={handleOnChange}
              className="peer sr-only"
            />
            <label
              htmlFor={`${code}-btn`}
              className="flex w-full flex-row items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-4 px-3 py-2 text-[#000] hover:cursor-pointer peer-checked:border-primary-200 peer-checked:bg-primary-100 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300 dark:peer-checked:border-primary-800 dark:peer-checked:bg-primary-900"
            >
              <div className="align-middle">
                <ReactCountryFlag countryCode={flag} />
              </div>
              <div className="font-semibold">{name}</div>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

const themes = [
  {
    name: "light",
    i18nKey: "settings:light-radio-button",
    Icon: SunIcon,
  },
  {
    name: "dark",
    i18nKey: "settings:dark-radio-button",
    Icon: MoonIcon,
  },
  {
    name: "system",
    i18nKey: "settings:system-radio-button",
    Icon: DesktopComputerIcon,
  },
];

const ThemeSwitch: FunctionComponent = () => {
  const { t } = useTranslation();
  const { setTheme, theme } = useTheme();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="mb-2 text-lg font-semibold">{t`settings:theme`}</h1>

        <fieldset role="radiogroup" className="flex flex-col gap-1">
          {themes.map(({ name, Icon, i18nKey }) => (
            <div key={name}>
              <input
                id={`${name}-btn`}
                type="radio"
                name="themes"
                value={name}
                checked={theme === name}
                onChange={handleOnChange}
                className="peer sr-only"
              />
              <label
                htmlFor={`${name}-btn`}
                className="flex w-full flex-row items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-4 px-3 py-2 text-[#000] hover:cursor-pointer peer-checked:border-primary-200 peer-checked:bg-primary-100 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300 dark:peer-checked:border-primary-800 dark:peer-checked:bg-primary-900"
              >
                <div className="align-middle">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{t(i18nKey)}</div>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </>
  );
};

const Appearance: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-4 text-[#000] dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300">
      <h1 className="mb-4 text-2xl font-semibold">{t`settings:appearance`}</h1>
      {children}
    </div>
  );
};

const Settings: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t`settings:title`}>
      <Container>
        <div className="flex flex-col gap-2 lg:max-w-screen-xl">
          <Appearance>
            <ThemeSwitch />
            <LanguageSwitch />
          </Appearance>
        </div>
      </Container>
    </Layout>
  );
};

export default Settings;
