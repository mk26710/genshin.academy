import { defineStore } from "pinia";

import type { PublishedItem } from "@/@types/custom";

interface State {
  published: {
    isImported: boolean;
    data: Array<PublishedItem>;
  };
}

const stateFactory = (): State => ({
  published: {
    isImported: false,
    data: [],
  },
});

export const useGuidesStore = defineStore({
  id: "guides",
  state: stateFactory,
  actions: {
    async lazyPublished() {
      const json = await import("@/data/guides/published.json");

      this.published.data = json.data;
      this.published.isImported = true;
      console.log("imported guides data");
    },
  },
  getters: {
    multipliedPublished: (state) => Array(10).fill(state.published.data).flat(),
  },
});
