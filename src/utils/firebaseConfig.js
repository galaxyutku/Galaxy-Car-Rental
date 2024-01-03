import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1lMRWzMHNClGhV9Bdpi5QqGeISW_d-jM",
  authDomain: "galaxyrentacar-bd82f.firebaseapp.com",
  databaseURL: "https://galaxyrentacar-bd82f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "galaxyrentacar-bd82f",
  storageBucket: "galaxyrentacar-bd82f.appspot.com",
  messagingSenderId: "1028704050929",
  appId: "1:1028704050929:web:60dc2c7fe4f9c4ec7fd350"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);