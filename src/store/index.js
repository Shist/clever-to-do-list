import { createStore } from "vuex";
import { firebaseModule } from "@/store/firebaseModule";
import { signInModule } from "@/store/signInModule";
import { signUpModule } from "@/store/signUpModule";
import { datesAndTasksModule } from "@/store/datesAndTasksModule";
import { taskCreationModule } from "@/store/taskCreationModule";
import { taskEditModule } from "@/store/taskEditModule";
import { toastModule } from "@/store/toastModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    firebase: firebaseModule,
    signIn: signInModule,
    signUp: signUpModule,
    datesAndTasks: datesAndTasksModule,
    taskCreation: taskCreationModule,
    taskEdit: taskEditModule,
    toast: toastModule,
  },
});
