import { createStore } from "vuex";
import { burgerMenuModule } from "@/store/burgerMenuModule";
import { datesModule } from "@/store/datesModule";
import { signInModule } from "@/store/signInModule";
import { signUpModule } from "@/store/signUpModule";
import { toastModule } from "@/store/toastModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    burgerMenu: burgerMenuModule,
    dates: datesModule,
    signIn: signInModule,
    signUp: signUpModule,
    toast: toastModule,
  },
});
