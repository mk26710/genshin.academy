import { BeakerIcon, HomeIcon, InformationCircleIcon as InfoIcon } from "@heroicons/vue/solid";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

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
    path: "/about",
    component: () => import("@/views/AboutView.vue"),
    meta: {
      navigation: {
        name: "About",
        icon: InfoIcon,
      },
    },
  },
  {
    path: "/guides",
    component: () => import("@/views/GuideHomeView.vue"),
    meta: {
      navigation: {
        name: "Guides",
        icon: BeakerIcon,
      },
    },
  },
  {
    path: "/article/:id",
    component: () => import("@/views/ArticleView.vue"),
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
