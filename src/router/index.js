import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import TaskByIdPage from "../pages/TaskByIdPage.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/sign-in",
    component: SignInPage,
  },
  {
    path: "/sign-up",
    component: SignUpPage,
  },
  {
    path: "/tasks/:id",
    component: TaskByIdPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userUid = store.getters["firebase/getUserUid"];

  if (to.path === "/sign-in" || to.path === "/sign-up") {
    userUid ? next("/") : next();
  } else {
    !userUid ? next("/sign-in") : next();
  }
});

export default router;
