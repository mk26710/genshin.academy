import { createRouter, createWebHistory, RouterView } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { BeakerIcon, CalculatorIcon, HomeIcon, StarIcon } from "@heroicons/vue/outline";

import CalcView from "@/views/CalcView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

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
    component: RouterView,
    children: [
      {
        path: "",
        component: () => import("@/views/GuideHomeView.vue"),
      },
      {
        path: ":id",
        component: () => import("@/views/GuideView.vue"),
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
    alias: "/character",
    component: RouterView,
    children: [
      {
        path: "",
        component: () => import("@/views/CharactersView.vue"),
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
