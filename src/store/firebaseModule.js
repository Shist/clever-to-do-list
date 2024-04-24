import { db } from "@/firebase.js";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

export const firebaseModule = {
  state: () => ({
    currUser: null,
  }),
  getters: {},
  mutations: {
    setCurrUser(state, currUser) {
      state.currUser = currUser;
    },
  },
  actions: {
    async fetchUserByEmail(context, email) {
      const q = query(
        collection(db, "users"),
        where("email", "==", `${email}`)
      );
      const querySnap = await getDocs(q);

      if (querySnap.docs.length) {
        context.commit("setCurrUser", querySnap.docs[0].data());
      } else {
        context.commit("setCurrUser", null);
      }
    },
    async createNewUser(context, { email, password }) {
      const userObj = {
        email: email,
        password: password,
        tasks: [],
      };
      await addDoc(collection(db, "users"), userObj);
      context.commit("setCurrUser", userObj);
    },
  },
  namespaced: true,
};
