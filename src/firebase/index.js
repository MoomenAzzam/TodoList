import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA614Ph_RAR5DUvfnmYrx5OQO5LDeEtHWo",
  authDomain: "vue3-85ba6.firebaseapp.com",
  projectId: "vue3-85ba6",
  storageBucket: "vue3-85ba6.appspot.com",
  messagingSenderId: "949769607410",
  appId: "1:949769607410:web:d67115831a1e9aa9bdd86b",
  measurementId: "G-K0BSGR93LV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
