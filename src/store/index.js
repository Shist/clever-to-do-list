import { createStore } from "vuex";
import { burgerMenuModule } from "@/store/burgerMenuModule";
import { firebaseModule } from "@/store/firebaseModule";
import { signInModule } from "@/store/signInModule";
import { signUpModule } from "@/store/signUpModule";
import { datesAndTasksModule } from "@/store/datesAndTasksModule";
import { taskCreationModule } from "@/store/taskCreationModule";
import { toastModule } from "@/store/toastModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    burgerMenu: burgerMenuModule,
    firebase: firebaseModule,
    signIn: signInModule,
    signUp: signUpModule,
    datesAndTasks: datesAndTasksModule,
    taskCreation: taskCreationModule,
    toast: toastModule,
  },
});
