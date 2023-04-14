import * as appFunctions from "firebase/app";
import * as authFunctions from "firebase/auth";
import * as dbFunctions from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROFECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = appFunctions.initializeApp(firebaseConfig);
const firebaseAuth = authFunctions.getAuth(firebaseApp);
const googleProvider = new authFunctions.GoogleAuthProvider();
const db = dbFunctions.getFirestore(firebaseApp);

export {
  firebaseApp,
  firebaseAuth,
  googleProvider,
  db,
  authFunctions,
  dbFunctions,
};
