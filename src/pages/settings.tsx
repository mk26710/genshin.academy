import type { GetStaticProps, NextPage } from "next";
import type { ChangeEvent, FunctionComponent, PropsWithChildren } from "react";

import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const t = useTranslations();
  const { locale } = useRouter();

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof document !== "undefined") {
      // create NEXT_LOCALE for 90 days
      document.cookie = `NEXT_LOCALE=${e.target.value};max-age=7776000;path=/;SameSite=Lax`;

      void router.push("/settings", undefined, { locale: e.target.value });
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-2 font-semibold">{t("settings.language")}</h1>

      <fieldset role="radiogroup" className="flex flex-col gap-1">
        {locales.map(({ code, name, flag }) => (
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
            <label htmlFor={`${code}-btn`} className="radio-button">
              <div className="align-middle">
                <ReactCountryFlag countryCode={flag} />
              </div>
              <div className="font-medium">{name}</div>
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
    i18nKey: "settings.light-radio-button",
    Icon: SunIcon,
  },
  {
    name: "dark",
    i18nKey: "settings.dark-radio-button",
    Icon: MoonIcon,
  },
  {
    name: "system",
    i18nKey: "settings.system-radio-button",
    Icon: ComputerDesktopIcon,
  },
];

const ThemeSwitch: FunctionComponent = () => {
  const t = useTranslations();
  const { setTheme, theme } = useTheme();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="mb-2 font-semibold">{t("settings.theme")}</h1>

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
              <label htmlFor={`${name}-btn`} className="radio-button">
                <div className="align-middle">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-medium">{t(i18nKey)}</div>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </>
  );
};

const Appearance: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();

  return (
    <div className="card flex w-full flex-col gap-2">
      <h1 className="mb-4 text-xl font-semibold">{t("settings.appearance")}</h1>
      {children}
    </div>
  );
};

const Settings: NextPage = () => {
  const t = useTranslations();

  return (
    <Layout title={t("settings.title")}>
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

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    settings: (await import(`#/locales/${locale}/settings.json`)).default,
  };
  return {
    props: {
      messages,
    },
  };
};

export default Settings;
