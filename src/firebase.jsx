import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXGHI8dcBWjgLacMpMpFUr14nwR7gjsqo",
  authDomain: "chat-53914.firebaseapp.com",
  projectId: "chat-53914",
  storageBucket: "chat-53914.appspot.com",
  messagingSenderId: "864548965887",
  appId: "1:864548965887:web:15c32ec75ced56b7c6ebca",
};
 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
