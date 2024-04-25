import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore/lite";

export const firebaseModule = {
  state: () => ({
    userUid: null,
  }),
  getters: {},
  mutations: {
    setUserUid(state, userUid) {
      state.userUid = userUid;
    },
  },
  actions: {
    async signUpUser({ state, commit }, { email, password }) {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      commit("setUserUid", userCredential.user.uid);

      const db = getFirestore();
      const taskObj = {
        userUid: state.userUid,
        tasksList: [],
      };
      await addDoc(collection(db, "tasks"), taskObj);
    },
    async signInUser({ commit }, { email, password }) {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      commit("setUserUid", userCredential.user.uid);
    },
    async signOutUser({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("setUserUid", null);
    },
  },
  namespaced: true,
};
