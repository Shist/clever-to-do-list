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
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import store from "@/store";

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
  await setDoc(doc(db, "users", store.state.userData.userUid), {});
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
  const userTasksCollection = collection(
    db,
    "users",
    store.state.userData.userUid,
    "tasks"
  );
  const docsSnapshot = await getDocs(userTasksCollection);
  const tasksList = [];
  docsSnapshot.forEach((doc) => {
    tasksList.push({ id: doc.id, ...doc.data() });
  });
  store.commit("userData/setUserTasks", tasksList);
}

async function uploadNewTask(taskData) {
  taskData.date = new Date(taskData.date);
  const db = getFirestore();
  const userTasksCollection = collection(
    db,
    "users",
    store.state.userData.userUid,
    "tasks"
  );
  await addDoc(userTasksCollection, taskData);
}

async function changeExistingTask(taskData) {
  taskData.date = new Date(taskData.date);
  const db = getFirestore();
  const userTaskDoc = doc(
    db,
    "users",
    store.state.userData.userUid,
    "tasks",
    taskData.id
  );
  await updateDoc(userTaskDoc, {
    title: taskData.title,
    description: taskData.description,
    date: taskData.date,
    checked: taskData.checked,
  });
}

async function deleteExistingTask(taskId) {
  const db = getFirestore();
  const userTaskDoc = doc(
    db,
    "users",
    store.state.userData.userUid,
    "tasks",
    taskId
  );
  await deleteDoc(userTaskDoc);
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
