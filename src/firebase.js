import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYvIDmncwNR3sOJIqGtOX7B776M25B8jA",
  authDomain: "exam-figma.firebaseapp.com",
  projectId: "exam-figma",
  storageBucket: "exam-figma.firebasestorage.app",
  messagingSenderId: "1012327756978",
  appId: "1:1012327756978:web:f9588acd531dd2124385ab",
  measurementId: "G-48KD0SG3GF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
