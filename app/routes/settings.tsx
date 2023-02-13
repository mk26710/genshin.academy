import type { HeadersFunction, MetaFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";

import { useFetcher } from "@remix-run/react";

import { Main } from "~/components/main";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { supportedLocales } from "~/utils/locales";
import { generateTitle } from "~/utils/meta-generator";

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

  const onChangeLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    fetcher.submit(
      { locale: e.target.value },
      { action: "/set-locale", method: "patch", replace: true, preventScrollReset: true },
    );
  };

  return (
    <Main>
      <Main.Container className="grid grid-flow-dense auto-rows-min grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-box bg-white p-4 py-5 shadow sm:p-6">
          <h3 className="text-lg font-semibold">Display Language</h3>

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
      </Main.Container>
    </Main>
  );
}
