import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcHnypcXzItJoytzoD18zBVyzOrRU7Wj8",
  authDomain: "lil-nouns.firebaseapp.com",
  projectId: "lil-nouns",
  storageBucket: "lil-nouns.appspot.com",
  messagingSenderId: "914992971754",
  appId: "1:914992971754:web:61a56af970b68051dd3c93",
  measurementId: "G-W1G24NE6RG",
  databaseURL: "https://lil-nouns-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
