import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "muhriddin-auth.firebaseapp.com",
  projectId: "muhriddin-auth",
  storageBucket: "muhriddin-auth.appspot.com",
  messagingSenderId: "859589990968",
  appId: "1:859589990968:web:89bad453b1c043b92164cd",
  measurementId: "G-SX97GHMP8P",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
