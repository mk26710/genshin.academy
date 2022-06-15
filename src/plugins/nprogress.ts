import type { App } from "vue";

import nProgress from "nprogress";

import { nprogressKey } from "@/plugins/symbols";

export default {
  install: (app: App) => {
    nProgress.configure({
      showSpinner: false,
    });

    app.config.globalProperties.$nProgress = nProgress;
    app.provide(nprogressKey, nProgress);
  },
};
