import type { EntryContext } from "@remix-run/node";

import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

import { tailwindStyles } from "./utils/tailwind.server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  const headCloseTagAt = markup.indexOf("</head>");
  const beforeHeadCloseTag = markup.substring(0, headCloseTagAt);
  const afterHeadCloseTag = markup.substring(headCloseTagAt);

  const css = await tailwindStyles();
  const styleTag = `<style>${css}</style>`;

  const newMarkup = `${beforeHeadCloseTag}${styleTag}${afterHeadCloseTag}`;

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + newMarkup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
