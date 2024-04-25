import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";

export const firebaseModule = {
  state: () => ({
    userUid: null,
    userEmail: null,
  }),
  getters: {},
  mutations: {
    setUserUid(state, userUid) {
      state.userUid = userUid;
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
  },
  actions: {
    async signUpUser({ state }, { email, password }) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      const db = getFirestore();
      await setDoc(doc(db, "tasks", state.userUid), {
        tasksList: [],
      });
    },
    async signInUser(context, { email, password }) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
    async signOutUser({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("setUserUid", null);
      commit("setUserEmail", null);
    },
  },
  namespaced: true,
};
