import { z } from "zod";
import { defineStore } from "pinia";
import { uniq } from "lodash-es";

import ids from "@/data/guides/compiled/characters/published.json";

const Guide = z.object({
  id: z.string(),
  html: z.string(),
});

export type Guide = z.infer<typeof Guide>;

const State = z.object({
  isUpdated: z.boolean(),
  all: Guide.array(),
});

type State = z.infer<typeof State>;

const stateFactory = (): State => {
  return {
    isUpdated: false,
    all: [],
  };
};

export const useGuideStore = defineStore({
  id: `guide`,
  state: stateFactory,
  persist: {
    paths: [`all`],
  },
  actions: {
    async update() {
      const jsons = await Promise.all(
        ids.map((id) => import(`../data/guides/compiled/characters/${id}.json`)),
      );

      const guides = await Promise.all(jsons.map((o) => Guide.parseAsync(o)));

      this.all = uniq(guides);
      this.isUpdated = true;

      console.log(`Guides data is now fresh!`);
    },
  },
  getters: {
    getGuideById: (state) => (id: string) => {
      return state.all.find((g) => g.id === id);
    },
  },
});
