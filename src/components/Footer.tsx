import type { FC } from "react";

import Trans from "next-translate/Trans";

import { ExternalLink } from "@/components/ExternalLink";
import { DiscordLogo } from "@/components/icons/DiscordLogo";
import { GitHubLogo } from "@/components/icons/GitHubLogo";

export const Footer: FC = () => {
  return (
    <footer className="footer grid grid-cols-1 grid-rows-[auto_auto] border-t border-neutral-200 py-4 text-sm text-neutral-400 dark:border-dark-800 dark:text-dark-600 lg:grid-cols-[1fr_auto] lg:grid-rows-1">
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

      <div className="mt-6 flex flex-col gap-x-6 gap-y-2 place-self-start font-bold lg:mt-0 lg:flex-row lg:place-self-center">
        <ExternalLink href="https://github.com/kitsune-guuji/gvp">
          <div className="flex flex-row items-center gap-x-2">
            <GitHubLogo className="inline-block h-auto w-4" />
            <p>GitHub</p>
          </div>
        </ExternalLink>

        <ExternalLink href="https://discord.gg/TgyFNhthCK">
          <div className="flex flex-row items-center gap-x-2">
            <DiscordLogo className="inline-block h-auto w-4" />
            <p>Discord</p>
          </div>
        </ExternalLink>
      </div>
    </footer>
  );
};
