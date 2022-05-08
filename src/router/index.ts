import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
import ArticleView from "@/views/ArticleView.vue";
import GuideHomeView from "@/views/GuideHomeView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/about",
    name: "AboutView",
    component: AboutView,
  },
  {
    path: "/guides",
    alias: "/guide",
    component: GuideHomeView,
  },
  {
    path: "/article/:id",
    name: "Article",
    component: ArticleView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
