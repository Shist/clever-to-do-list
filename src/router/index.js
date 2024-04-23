import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import TaskByIdPage from "../pages/TaskByIdPage.vue";

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

export default router;
