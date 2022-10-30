import { json } from "@remix-run/node";

export type TypedErrorResponse<Code = unknown, Message = string, Cause = Error> = {
  code?: Code;
  message?: Message;
  cause?: Cause;
};

export const typedError = <Code = unknown, Message = string, Cause = Error>(
  data: TypedErrorResponse<Code, Message, Cause>,
) => {
  return data;
};

export function badRequest<T = TypedErrorResponse>(data: T) {
  return json(data, { status: 401, statusText: "Bad Request" });
}

export function unauthorized<T = TypedErrorResponse>(data: T) {
  return json(data, { status: 401, statusText: "Unauthorized" });
}

export function forbidden<T = TypedErrorResponse>(data: T) {
  return json(data, { status: 403, statusText: "Forbidden" });
}

export function notFound<T = TypedErrorResponse>(data: T) {
  return json(data, { status: 404, statusText: "Not Found" });
}

export function serverError<T = TypedErrorResponse>(data: T) {
  return json(data, { status: 500, statusText: "Internal Server Error" });
}
