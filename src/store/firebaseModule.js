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
    async signUpUser({ state, commit }, { email, password }) {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      commit("setUserUid", userCredential.user.uid);
      commit("setUserEmail", userCredential.user.email);

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
      commit("setUserEmail", userCredential.user.email);
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
