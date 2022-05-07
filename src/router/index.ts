import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import Article from "@/views/ArticleView.vue";
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
    path: "/article/:id",
    name: "Article",
    component: Article,
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
