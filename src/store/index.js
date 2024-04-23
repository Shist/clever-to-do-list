import { createStore } from "vuex";
import { datesModule } from "@/store/datesModule";
import { burgerMenuModule } from "@/store/burgerMenuModule";
import { infoSnackbarModule } from "@/store/infoSnackbarModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    dates: datesModule,
    burgerMenu: burgerMenuModule,
    snackbar: infoSnackbarModule,
  },
});
