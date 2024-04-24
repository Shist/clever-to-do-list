import { createStore } from "vuex";
import { datesModule } from "@/store/datesModule";
import { burgerMenuModule } from "@/store/burgerMenuModule";
import { signInModule } from "@/store/signInModule";
import { signUpModule } from "@/store/signUpModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    dates: datesModule,
    burgerMenu: burgerMenuModule,
    signIn: signInModule,
    signUp: signUpModule,
  },
});
