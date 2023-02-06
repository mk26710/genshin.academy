import type { To } from "@remix-run/router";
import type { FC, ReactNode } from "react";

import { Link } from "@remix-run/react";
import { useTranslations } from "use-intl";

import { Button } from "./ui/button";

type PostCardRootProps = {
  children: ReactNode;
  to: To;
};

const PostCardRoot: FC<PostCardRootProps> = ({ to, children }) => {
  const t = useTranslations();

  return (
    <div className="flex break-inside-avoid flex-col rounded-box bg-white shadow transition-shadow">
      {children}

      <Button as={Link} to={to} className="mx-6 mb-6 justify-self-end">
        {t("common.read")}
      </Button>
    </div>
  );
};

type PostCardImageProps = {
  src?: string;
};

const PostCardImage: FC<PostCardImageProps> = ({ src }) => {
  return (
    <figure className="px-6 pt-4 pb-4 first:pt-6 last:pb-6">
      <img src={src} className="aspect-video rounded-box" width="1920" height="1080" />
    </figure>
  );
};

type PostCardTitleProps = {
  children: ReactNode;
};

const PostCardTitle: FC<PostCardTitleProps> = ({ children }) => {
  return <h3 className="px-6 text-xl font-semibold">{children}</h3>;
};

type PostCardBodyProps = {
  children: ReactNode;
};

const PostCardBody: FC<PostCardBodyProps> = ({ children }) => {
  return <div className="flex flex-1 flex-col px-6 pb-4 last:pb-6">{children}</div>;
};

export const PostCard = Object.assign(PostCardRoot, {
  Image: PostCardImage,
  Title: PostCardTitle,
  Body: PostCardBody,
});
