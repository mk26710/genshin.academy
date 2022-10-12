import type { ResponseInit, SerializeFrom } from "@remix-run/node";

import { json, Response } from "@remix-run/node";

type TextResponseInit = Omit<ResponseInit, "statusText">;

/** Plain text response generator */
export const text = (body: string, options?: TextResponseInit) => {
  return new Response(body, { ...options, statusText: body });
};

type ErrorData<ErrorType> = {
  code?: string;
  message: string;
  cause?: ErrorType | string;
};

export const jsonError = <ErrorType>(
  data: ErrorData<ErrorType>,
  options?: Omit<ResponseInit, "statusText">,
) => {
  return json({ error: { ...data } }, { ...options, statusText: data.message });
};

export type JsonErrorResponse = SerializeFrom<typeof jsonError>;
