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
      const date = state.userTasks.find((task) => task.id === id)?.date;
      if (date) {
        return new Date(
          date.seconds * 1000 + date.nanoseconds / 1000000
        ).toLocaleDateString();
      } else {
        new Date().toLocaleDateString();
      }
    },
    currWeekDayById: (state) => (id) => {
      const date = state.userTasks.find((task) => task.id === id)?.date;
      if (date) {
        return format(
          new Date(date.seconds * 1000 + date.nanoseconds / 1000000),
          "eee"
        );
      } else {
        return format(new Date(), "eee");
      }
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
      commit("setUserTasks", null);
    },
    async loadUserTasks({ state, commit }) {
      const db = getFirestore();
      const userTasksRef = doc(db, "tasks", state.userUid);
      const tasksSnap = await getDoc(userTasksRef);
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
      const userTasksRef = doc(db, "tasks", state.userUid);
      await updateDoc(userTasksRef, { tasksList: arrayUnion(taskData) });
    },
    async changeExistingTask({ state }, taskData) {
      taskData.date = new Date(taskData.date);
      const db = getFirestore();
      const userTasksRef = doc(db, "tasks", state.userUid);
      const tasksSnap = await getDoc(userTasksRef);
      if (!tasksSnap.exists()) {
        throw new Error("There is no tasks list for current user.");
      }
      const tasksList = tasksSnap.data().tasksList;
      tasksList[tasksList.findIndex((task) => task.id === taskData.id)] = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        date: taskData.date,
        checked: taskData.checked,
      };
      await updateDoc(userTasksRef, { tasksList });
    },
    async deleteExistingTask({ state }, taskId) {
      const db = getFirestore();
      const userTasksRef = doc(db, "tasks", state.userUid);
      const tasksSnap = await getDoc(userTasksRef);
      if (!tasksSnap.exists()) {
        throw new Error("There is no tasks list for current user.");
      }
      const tasksList = tasksSnap.data().tasksList;
      tasksList.splice(
        tasksList.findIndex((task) => task.id === taskId),
        1
      );
      await updateDoc(userTasksRef, { tasksList });
    },
  },
  namespaced: true,
};
