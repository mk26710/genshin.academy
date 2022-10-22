import type { FunctionComponent } from "react";

interface Props {
  src: string;
  alt: string;
  withOptimal?: boolean;
  className?: string;
}

export const StaticPicture: FunctionComponent<Props> = ({
  src,
  alt,
  withOptimal = true,
  className = "",
}) => {
  const mobileSrc = src.split(".").slice(0, -1).join(".") + "_1200.webp";

  // if optimal is not desired, then just show the iamge
  if (withOptimal !== true)
    return (
      <picture>
        <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
      </picture>
    );

  return (
    <picture>
      {/* Breakpoint is the same as tailwind's lg:something */}
      <source srcSet={src} media="(min-width: 1024px)" />
      <img src={mobileSrc} alt={alt} className={className} loading="lazy" decoding="async" />
    </picture>
  );
};
