export type Nil<T> = T | null | undefined;

export type RouteHandle = {
  id?: string;
  name?: string;
  withScrollRestoration?: boolean;
  hasSearch?: boolean;
} & Record<string, unknown>;

export type MaybePromise<T> = Promise<T> | T;
