import { createStore } from "vuex";
import { userDataModule } from "@/store/userDataModule";
import { datesAndTasksModule } from "@/store/datesAndTasksModule";
import { toastModule } from "@/store/toastModule";

export default createStore({
  state: {},

  getters: {},

  mutations: {},

  actions: {},

  modules: {
    userData: userDataModule,
    datesAndTasks: datesAndTasksModule,
    toast: toastModule,
  },
});
