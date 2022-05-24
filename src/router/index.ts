import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import { BeakerIcon, CalculatorIcon, HomeIcon } from "@heroicons/vue/outline";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomeView,
    meta: {
      navigation: {
        name: "Home",
        icon: HomeIcon,
      },
    },
  },
  {
    path: "/guides",
    alias: "/guide",
    component: () => import("@/views/GuideHomeView.vue"),
    meta: {
      navigation: {
        name: "Guides",
        icon: BeakerIcon,
      },
    },
  },
  {
    path: "/calc",
    alias: "/calculations",
    component: () => import("@/views/CalcView.vue"),
    meta: {
      navigation: {
        name: "Calculate",
        icon: CalculatorIcon,
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
