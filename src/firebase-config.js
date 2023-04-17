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

const app = appFunctions.initializeApp(firebaseConfig);
const auth = authFunctions.getAuth(app);
const googleProvider = new authFunctions.GoogleAuthProvider();
const db = dbFunctions.getFirestore(app);

const firebase = {
  app,
  auth,
  googleProvider,
  db,
  functions: { auth: authFunctions, db: dbFunctions },
};

export default firebase;
