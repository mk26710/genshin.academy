import { BeakerIcon, HomeIcon, InformationCircleIcon as InfoIcon } from "@heroicons/vue/solid";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
import ArticleView from "@/views/ArticleView.vue";
import GuideHomeView from "@/views/GuideHomeView.vue";
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
    component: AboutView,
    meta: {
      navigation: {
        name: "About",
        icon: InfoIcon,
      },
    },
  },
  {
    path: "/guides",
    component: GuideHomeView,
    meta: {
      navigation: {
        name: "Guides",
        icon: BeakerIcon,
      },
    },
  },
  {
    path: "/article/:id",
    component: ArticleView,
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
