import nProgress from "nprogress";
import type { Router } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  nProgress.configure({
    showSpinner: false,
  });

  const router: Router = nuxtApp.$router;

  router.beforeEach((to, from, next) => {
    nProgress.start();
    nProgress.set(0.1);

    next();
  });
  console.debug(`nprogress added to router.beforeEach()`);

  router.afterEach(() => {
    setTimeout(() => {
      nProgress.done();
    }, 250);
  });
  console.debug(`nprogress added to router.afterEach()`);
});
