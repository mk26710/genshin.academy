import { defineStore } from "pinia";

import type { PublishedItem } from "@/@types/custom";

interface Published {
  isImported: boolean;
  data: Array<PublishedItem>;
}

interface Selected {
  id: null | string;
  html: null | string;
  error: null | Error;
}

interface State {
  published: Published;
  selected: Selected;
}

const stateFactory = (): State => ({
  selected: {
    id: null,
    html: null,
    error: null,
  },
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
    resetSelected() {
      this.selected = stateFactory().selected;
    },
    setSelected(payload: Omit<Selected, "error">) {
      this.selected.id = payload.id;
      this.selected.html = payload.html;
    },
    setSelectedError(payload: Error) {
      this.selected.error = payload;
    },
  },
  getters: {
    multipliedPublished: (state) => Array(10).fill(state.published.data).flat(),
  },
});
