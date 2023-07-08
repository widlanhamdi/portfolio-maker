import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAt9Amm1mVZH89-knwQea05pA8mgQQ3IJ0",
  authDomain: "portfolio-maker-60b46.firebaseapp.com",
  projectId: "portfolio-maker-60b46",
  storageBucket: "portfolio-maker-60b46.appspot.com",
  messagingSenderId: "801070725254",
  appId: "1:801070725254:web:636985edfd9d6ef7a3b907",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
