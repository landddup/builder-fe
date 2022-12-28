import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as authFunctions from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJejMYKLUIy8qQMnZv-SPr8LRkLBJzgH8",
  authDomain: "landddup-253d9.firebaseapp.com",
  projectId: "landddup-253d9",
  storageBucket: "landddup-253d9.appspot.com",
  messagingSenderId: "538928337112",
  appId: "1:538928337112:web:7eff7836abd9e22a1147ad",
  measurementId: "G-9FGPSDXZRM",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = authFunctions.getAuth(firebaseApp);

export { firebaseApp, firebaseAnalytics, firebaseAuth, authFunctions };
