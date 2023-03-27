import { PhotoIcon } from "@heroicons/react/24/solid";
import type { ComponentPropsWithRef, FC } from "react";
import { useEffect, useState } from "react";
import type { Nil } from "~/types/common";

type LazyImageProps = ComponentPropsWithRef<"img">;

export const LazyImage: FC<LazyImageProps> = ({
  decoding = "async",
  loading = "lazy",
  ...props
}) => {
  const [src, setSrc] = useState<Nil<string>>(null);

  useEffect(() => {
    setSrc(null);

    if (props.src) {
      const handleLoad = () => {
        setSrc(props.src);
      };

      const image = new Image();
      if (image.complete) {
        image.src = props.src;
      }

      image.addEventListener("load", handleLoad);
      image.src = props.src;

      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.src]);

  if (src == null) {
    return <PhotoIcon className="h-full max-h-[32px] w-auto animate-pulse text-base-content" />;
  }

  return <img src={src} {...props} decoding={decoding} loading={loading} />;
};
