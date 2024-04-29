import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore/lite";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const firebaseModule = {
  state: () => ({
    userUid: null,
    userEmail: null,
    userTasks: null,
  }),
  getters: {
    currTaskById: (state) => (id) => {
      return state.userTasks.find((task) => task.id === id);
    },
    currDateById: (state) => (id) => {
      const date = state.userTasks.find((task) => task.id === id).date;
      return new Date(
        date.seconds * 1000 + date.nanoseconds / 1000000
      ).toLocaleDateString();
    },
    currWeekDayById: (state) => (id) => {
      const date = state.userTasks.find((task) => task.id === id).date;
      return format(
        new Date(date.seconds * 1000 + date.nanoseconds / 1000000),
        "eee"
      );
    },
  },
  mutations: {
    setUserUid(state, userUid) {
      state.userUid = userUid;
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
    setUserTasks(state, userTasks) {
      state.userTasks = userTasks;
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
    async loadUserTasks({ state, commit }) {
      const db = getFirestore();
      const tasksRef = doc(db, "tasks", state.userUid);
      const tasksSnap = await getDoc(tasksRef);
      if (tasksSnap.exists()) {
        commit("setUserTasks", tasksSnap.data().tasksList);
      } else {
        throw new Error("There is no tasks list for current user.");
      }
    },
    async uploadNewTask({ state }, taskData) {
      taskData.id = uuidv4();
      taskData.date = new Date(taskData.date);
      const db = getFirestore();
      const tasksRef = doc(db, "tasks", state.userUid);
      await updateDoc(tasksRef, { tasksList: arrayUnion(taskData) });
    },
  },
  namespaced: true,
};
