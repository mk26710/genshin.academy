import { defineStore } from "pinia";

interface State {
  resin: {
    current: number | "";
    needed: number | "";
  };
}

const stateFactory = (): State => ({
  resin: {
    current: "",
    needed: 160,
  },
});

export const useCalcStore = defineStore({
  id: "calc",
  state: stateFactory,
});
