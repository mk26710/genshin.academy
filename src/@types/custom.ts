export type Nullish<T> = T | null | undefined;

export interface PublishedItem {
  id: string;
  title: string;
  brief: string;
  publishedAt: number;
}
