import { isError } from "lodash-es";
import { defineStore } from "pinia";

import type { Guide } from "@/data/types/data";

interface Selected {
  id: null | string;
  html: null | string;
  error: null | Error;
  isLoading: boolean;
}

interface State {
  selected: Selected;
}

const stateFactory = (): State => ({
  selected: {
    id: null,
    html: null,
    error: null,
    isLoading: true,
  },
});

export const useGuidesStore = defineStore({
  id: "guides",
  state: stateFactory,
  actions: {
    async importGuide(id: string) {
      this.selected = stateFactory().selected;

      try {
        const data: Guide = await import(`../data/guides/characters/${id}.json`);

        this.selected.id = data.id;
        this.selected.html = data.nodes.join("");
      } catch (error) {
        if (isError(error)) {
          this.selected.error = error;
        }
      } finally {
        this.selected.isLoading = false;
      }
    },
  },
});
