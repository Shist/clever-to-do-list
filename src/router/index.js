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

router.beforeEach((to) => {
  if (to.path !== "/sign-in" && to.path !== "/sign-up") {
    if (!store.state.firebase.currUser) {
      return "/sign-in";
    }
  }
  return true;
});

export default router;
