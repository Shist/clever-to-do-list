import { createStore } from "vuex";
import { burgerMenuModule } from "@/store/burgerMenuModule";
import { datesAndTasksModule } from "@/store/datesAndTasksModule";
import { signInModule } from "@/store/signInModule";
import { signUpModule } from "@/store/signUpModule";
import { toastModule } from "@/store/toastModule";
import { firebaseModule } from "@/store/firebaseModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    burgerMenu: burgerMenuModule,
    datesAndTasks: datesAndTasksModule,
    signIn: signInModule,
    signUp: signUpModule,
    toast: toastModule,
    firebase: firebaseModule,
  },
});
