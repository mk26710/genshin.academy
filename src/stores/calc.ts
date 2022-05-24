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
    needed: "",
  },
});

export const useCalcStore = defineStore({
  id: "calc",
  state: stateFactory,
});
