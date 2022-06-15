import { createRouter, createWebHistory, RouterView } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/vue/outline";

import CalcView from "@/views/CalcView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
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
    component: RouterView,
    children: [
      {
        path: "",
        name: "guides",
        component: () => import("@/views/guides/GuideHomeView.vue"),
      },
      {
        path: ":id",
        name: "guide",
        component: () => import("@/views/guides/GuideView.vue"),
        meta: {
          dynamicKey: true,
        },
      },
    ],
    meta: {
      navigation: {
        name: "Guides",
        icon: BeakerIcon,
      },
    },
  },
  {
    path: "/characters",
    component: RouterView,
    children: [
      {
        path: "",
        name: "characters",
        component: () => import("@/views/characters/CharactersIndex.vue"),
      },
      {
        path: ":id",
        name: "character",
        component: () => import("@/views/characters/CharactersId.vue"),
        meta: {
          dynamicKey: true,
        },
      },
    ],
    meta: {
      navigation: {
        name: "Characters",
        icon: StarIcon,
      },
    },
  },
  {
    path: "/calc",
    name: "calc",
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
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    }
  },
});

export default router;
