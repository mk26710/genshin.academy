import { z } from "zod";
import { defineStore } from "pinia";

import publishedCharactersGuides from "@/data/guides/compiled/characters/published.json";

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
  id: "guide",
  state: stateFactory,
  persist: {
    paths: ["all"],
  },
  actions: {
    async update() {
      const guides = await Promise.all(
        publishedCharactersGuides.map(async (id) => {
          const data = await import(`../data/guides/compiled/characters/${id}.json`);
          return Guide.parse(data);
        }),
      );

      this.all = [...guides];
      this.isUpdated = true;

      console.log("Guides data is now fresh!");
    },
  },
  getters: {
    getGuideById: (state) => (id: string) => {
      return state.all.find((g) => g.id === id);
    },
  },
});
