import { defineStore } from "pinia";

interface Selected {
  id: null | string;
  html: null | string;
  error: null | Error;
}

interface State {
  selected: Selected;
}

const stateFactory = (): State => ({
  selected: {
    id: null,
    html: null,
    error: null,
  },
});

export const useGuidesStore = defineStore({
  id: "guides",
  state: stateFactory,
  actions: {
    resetSelected() {
      this.selected = { ...stateFactory().selected };
    },
    setSelected(payload: Omit<Selected, "error">) {
      this.selected = { ...payload, error: null };
    },
    setSelectedError(payload: Error) {
      this.selected = { ...stateFactory().selected, error: payload };
    },
  },
});
