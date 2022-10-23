type Nil<T> = T | null | undefined;

type RouteHandle = {
  id?: string;
  name?: string;
  withScrollRestoration?: boolean;
} & Record<string, unknown>;
