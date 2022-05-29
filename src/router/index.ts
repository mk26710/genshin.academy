import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import CalcView from "@/views/CalcView.vue";
import CharactersView from "@/views/CharactersView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/vue/outline";

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
    path: "/guides/:id",
    alias: "/guide/:id",
    component: () => import("@/views/GuideView.vue"),
  },
  {
    path: "/character",
    alias: "/characters",
    component: CharactersView,
    meta: {
      navigation: {
        name: "Characters",
        icon: StarIcon,
      },
    },
  },
  {
    path: "/calc",
    alias: "/calculations",
    component: CalcView,
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
  history: createWebHistory(),
  routes,
});

export default router;
