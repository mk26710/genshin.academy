import type { FC } from "react";

import Trans from "next-translate/Trans";

import { ExternalLink } from "@/components/ExternalLink";
import { DiscordLogo } from "@/components/icons/DiscordLogo";
import { GitHubLogo } from "@/components/icons/GitHubLogo";

export const Footer: FC = () => {
  return (
    <footer className="footer text-sm grid grid-cols-1 lg:grid-cols-[1fr_auto] grid-rows-[auto_auto] lg:grid-rows-1 py-4 mx-4 text-neutral-400 dark:text-dark-600 border-t border-neutral-200 dark:border-dark-800">
      <p>
        <Trans
          i18nKey="footer:affiliation"
          components={{
            officialWebsite: <ExternalLink href="https://www.mihoyo.com/" />,
          }}
        />
        <br />
        <Trans
          i18nKey="footer:copyright"
          components={{
            officialWebsite: <ExternalLink href="https://www.mihoyo.com/" />,
          }}
        />
      </p>

      <div className="place-self-start lg:place-self-center flex flex-col lg:flex-row gap-x-6 gap-y-2 mt-6 lg:mt-0 font-bold">
        <ExternalLink href="https://github.com/kitsune-guuji/gvp">
          <div className="flex flex-row gap-x-2 items-center">
            <GitHubLogo className="w-4 h-auto inline-block" />
            <p>GitHub</p>
          </div>
        </ExternalLink>

        <ExternalLink href="https://discord.gg/TgyFNhthCK">
          <div className="flex flex-row gap-x-2 items-center">
            <DiscordLogo className="w-4 h-auto inline-block" />
            <p>Discord</p>
          </div>
        </ExternalLink>
      </div>
    </footer>
  );
};
