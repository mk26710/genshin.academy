import { marked } from "marked";
import type { App } from "vue";

import { markedKey } from "@/plugins/symbols";

export default {
  install: (app: App) => {
    app.provide(markedKey, marked);
  },
};
