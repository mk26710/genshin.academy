import type { FC } from "react";

import { useTranslations } from "use-intl";

import { ExternalLink } from "~/components/ExternalLink";
import { DiscordLogo } from "~/components/icons/DiscordLogo";
import { GitHubLogo } from "~/components/icons/GitHubLogo";

export const Footer: FC = () => {
  const t = useTranslations();

  return (
    <footer className="footer border-t border-neutral-200 text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
      <div className="mx-auto grid w-full max-w-[var(--max-content-width)] grid-cols-1 grid-rows-[auto_auto] border-neutral-400 px-[var(--default-gap)] py-8 text-sm lg:grid-cols-[1fr_auto]">
        <p>
          {t.rich("footer.affiliation", {
            officialWebsite: (children) => (
              <ExternalLink href="https://www.mihoyo.com/">{children}</ExternalLink>
            ),
          })}
          <br />
          {t.rich("footer.copyright", {
            officialWebsite: (children) => (
              <ExternalLink href="https://www.mihoyo.com/">{children}</ExternalLink>
            ),
          })}
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
      </div>
    </footer>
  );
};
