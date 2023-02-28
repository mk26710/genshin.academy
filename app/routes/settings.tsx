import type { HeadersFunction, MetaFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";

import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "@remix-run/react";

import { Main } from "~/components/main";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { supportedLocales } from "~/utils/locales";
import { generateTitle } from "~/utils/meta-generator";
import { useColorScheme } from "~/hooks/use-color-scheme";
import { SUPPORTED_COLOR_SCHEMES } from "~/utils/color-scheme/common";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const meta: MetaFunction = () => ({
  robots: "noindex",
  title: generateTitle("New Post"),
});

export default function SettingsRoute() {
  const fetcher = useFetcher();

  const currentLocale = useVisitorLocale();
  const currentColorScheme = useColorScheme()

  const onChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    fetcher.submit(
      { locale: e.target.value },
      { action: "/set-locale", method: "patch", replace: true, preventScrollReset: true },
    );
  };

  const onChangeColorScheme = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    fetcher.submit(
      { "color-scheme": e.target.value },
      { action: "/set-color-scheme", method: "patch", replace: true, preventScrollReset: true },
    );
  };

  return (
    <Main>
      <Main.Container className="grid grid-flow-dense auto-rows-min grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-box bg-white p-4 py-5 shadow sm:p-6">
          <h3 className="flex flex-row gap-2 text-lg font-semibold">
            <span>Display Language</span>
            {fetcher.type === "actionSubmission" && (
              <span className="text-primary-500">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              </span>
            )}
          </h3>

          <select
            onChange={onChangeLocale}
            defaultValue={currentLocale}
            disabled={fetcher.type === "actionSubmission"}
            className="select disabled:cursor-progress"
          >
            {supportedLocales.map((lo) => (
              <option key={lo}>{lo}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 rounded-box bg-white p-4 py-5 shadow sm:p-6">
          <h3 className="flex flex-row gap-2 text-lg font-semibold">
            <span>Display Language</span>
            {fetcher.type === "actionSubmission" && (
              <span className="text-primary-500">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              </span>
            )}
          </h3>

          <select
            onChange={onChangeColorScheme}
            defaultValue={currentColorScheme ?? undefined}
            disabled={fetcher.type === "actionSubmission"}
            className="select disabled:cursor-progress"
          >
            {SUPPORTED_COLOR_SCHEMES.map((cs) => (
              <option key={cs}>{cs}</option>
            ))}
          </select>
        </div>
      </Main.Container>
    </Main>
  );
}
