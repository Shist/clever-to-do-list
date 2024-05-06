import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import TaskByIdPage from "../pages/TaskByIdPage.vue";
import TaskCreationPage from "../pages/TaskCreationPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/sign-in",
    component: SignInPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/sign-up",
    component: SignUpPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/tasks/:id",
    component: TaskByIdPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/create-new-task",
    component: TaskCreationPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userUid = store.state.userData.userUid;

  if (to.meta.requiresAuth) {
    !userUid ? next("/sign-in") : next();
  } else {
    userUid ? next("/") : next();
  }
});

export default router;
