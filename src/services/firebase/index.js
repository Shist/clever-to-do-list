import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
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
import store from "@/store";
import { v4 as uuidv4 } from "uuid";

const TASKS = process.env.VUE_APP_FIREBASE_COLLECTION_NAME;
const TASKS_LIST = process.env.VUE_APP_FIREBASE_COLLECTION_LIST_FIELD;

const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
});

const auth = getAuth(firebaseApp);

function onFirebaseAuthStateChanged(initFoo) {
  onAuthStateChanged(auth, initFoo);
}

async function signUpUser(email, password) {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);

  const db = getFirestore();
  await setDoc(doc(db, TASKS, store.state.userData.userUid), {
    [TASKS_LIST]: [],
  });
}

async function signInUser(email, password) {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
}

async function signOutUser() {
  const auth = getAuth();
  await signOut(auth);
  store.commit("userData/setUserUid", null);
  store.commit("userData/setUserEmail", null);
  store.commit("userData/setUserTasks", null);
}

async function loadUserTasks() {
  const db = getFirestore();
  const userTasksRef = doc(db, TASKS, store.state.userData.userUid);
  const tasksSnap = await getDoc(userTasksRef);
  if (tasksSnap.exists()) {
    store.commit("userData/setUserTasks", tasksSnap.data()[TASKS_LIST]);
  } else {
    throw new Error("There is no tasks list for current user.");
  }
}

async function uploadNewTask(taskData) {
  taskData.id = uuidv4();
  taskData.date = new Date(taskData.date);
  const db = getFirestore();
  const userTasksRef = doc(db, TASKS, store.state.userData.userUid);
  await updateDoc(userTasksRef, { [TASKS_LIST]: arrayUnion(taskData) });
}

async function changeExistingTask(taskData) {
  taskData.date = new Date(taskData.date);
  const db = getFirestore();
  const userTasksRef = doc(db, TASKS, store.state.userData.userUid);
  const tasksSnap = await getDoc(userTasksRef);
  if (!tasksSnap.exists()) {
    throw new Error("There is no tasks list for current user.");
  }
  const tasksList = tasksSnap.data()[TASKS_LIST];
  tasksList[tasksList.findIndex((task) => task.id === taskData.id)] = {
    id: taskData.id,
    title: taskData.title,
    description: taskData.description,
    date: taskData.date,
    checked: taskData.checked,
  };
  await updateDoc(userTasksRef, { [TASKS_LIST]: tasksList });
}

async function deleteExistingTask(taskId) {
  const db = getFirestore();
  const userTasksRef = doc(db, TASKS, store.state.userData.userUid);
  const tasksSnap = await getDoc(userTasksRef);
  if (!tasksSnap.exists()) {
    throw new Error("There is no tasks list for current user.");
  }
  const tasksList = tasksSnap.data()[TASKS_LIST];
  tasksList.splice(
    tasksList.findIndex((task) => task.id === taskId),
    1
  );
  await updateDoc(userTasksRef, { [TASKS_LIST]: tasksList });
}

export {
  onFirebaseAuthStateChanged,
  signUpUser,
  signInUser,
  signOutUser,
  loadUserTasks,
  uploadNewTask,
  changeExistingTask,
  deleteExistingTask,
};
