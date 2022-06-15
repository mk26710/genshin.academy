import type { App } from "vue";
import type { Router } from "vue-router";

import nProgress from "nprogress";

import { nprogressKey } from "@/plugins/symbols";

export default {
  install: (app: App) => {
    nProgress.configure({
      showSpinner: false,
    });

    app.config.globalProperties.$nProgress = nProgress;
    app.provide(nprogressKey, nProgress);

    const router: Router = app.config.globalProperties.$router;

    router.beforeEach((to, from, next) => {
      nProgress.start();
      nProgress.set(0.1);

      next();
    });
    console.debug("nprogress added to router.beforeEach()");

    router.afterEach(() => {
      setTimeout(() => {
        nProgress.done();
      }, 250);
    });
    console.debug("nprogress added to router.afterEach()");
  },
};
