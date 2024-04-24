import { createStore } from "vuex";
import { datesModule } from "@/store/datesModule";
import { burgerMenuModule } from "@/store/burgerMenuModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    dates: datesModule,
    burgerMenu: burgerMenuModule,
  },
});
