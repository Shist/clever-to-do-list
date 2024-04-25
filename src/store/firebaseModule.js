import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore/lite";

export const firebaseModule = {
  state: () => ({}),
  getters: {
    getUserUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
  },
  mutations: {},
  actions: {
    async signUpUser({ getters }, { email, password }) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      const db = getFirestore();
      const taskObj = {
        userUid: getters.getUserUid,
        tasksList: [],
      };
      await addDoc(collection(db, "tasks"), taskObj);
    },
    async signInUser(context, { email, password }) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
    async signOutUser() {
      const auth = getAuth();
      await signOut(auth);
    },
  },
  namespaced: true,
};
