import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC_0owuXc-s6bbMRF4LbAVY43e7I4iLJFM",
  authDomain: "tattoostudio-b07ca.firebaseapp.com",
  projectId: "tattoostudio-b07ca",
  storageBucket: "tattoostudio-b07ca.firebasestorage.app",
  messagingSenderId: "441404689998",
  appId: "1:441404689998:web:4434528bdfe92d0e48bd1f",
  measurementId: "G-ZKWHB6D3XB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 