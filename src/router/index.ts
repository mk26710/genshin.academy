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
  },
  {
    path: "/about",
    component: AboutView,
  },
  {
    path: "/guides",
    alias: "/guide",
    component: GuideHomeView,
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
