import type dayjs from "dayjs";
import type nProgress from "nprogress";
import type { InjectionKey } from "vue";

export const dayjsKey: InjectionKey<typeof dayjs> = Symbol("dayjs");
export const nprogressKey: InjectionKey<typeof nProgress> = Symbol("nProgress");
