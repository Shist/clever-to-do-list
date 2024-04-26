import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import TaskByIdPage from "../pages/TaskByIdPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
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
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userUid = store.state.firebase.userUid;

  if (to.path === "/sign-in" || to.path === "/sign-up") {
    userUid ? next("/") : next();
  } else {
    if (to.path === "/tasks/:id") {
      // todo
      !userUid ? next("/sign-in") : next();
    } else {
      !userUid ? next("/sign-in") : next();
    }
  }
});

export default router;
