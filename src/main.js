import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router";
import store from "@/store";
import { onFirebaseAuthStateChanged } from "@/services/firebase";
import Vue3Toasity from "vue3-toastify";
import "@/styles/reset.css";

let app = null;

onFirebaseAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App);

    components.forEach((component) => {
      app.component(component.name, component);
    });

    app
      .use(router)
      .use(store)
      .use(Vue3Toasity, { clearOnUrlChange: false })
      .mount("#app");
  }

  store.commit("userData/setUserUid", user ? user.uid : null);
  store.commit("userData/setUserEmail", user ? user.email : null);
});
