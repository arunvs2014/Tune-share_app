// Remember to replace this with your own Firebase project configuration

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiuEbkpBayaQ4qF_6Wik-TiFVWz4VKHj4",
  authDomain: "tuneshare-30d1d.firebaseapp.com",
  projectId: "tuneshare-30d1d",
  storageBucket: "tuneshare-30d1d.appspot.com",
  messagingSenderId: "126535824059",
  appId: "1:126535824059:web:08a35adceb65aad1006f9e",
  measurementId: "G-MYBKFWGCM9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
