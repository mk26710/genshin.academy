import type { ResponseInit } from "@remix-run/node";
import { Response } from "@remix-run/node";

type TextResponseInit = Omit<ResponseInit, "statusText">;

/** Plain text response generator */
export const text = (body: string, options?: TextResponseInit) => {
  return new Response(body, { ...options, statusText: body });
};
