// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPzuEo_zbi23AOw7Tl36uOXYTYNoGbWPA",
  authDomain: "track-overview.firebaseapp.com",
  projectId: "track-overview",
  storageBucket: "track-overview.appspot.com",
  messagingSenderId: "298195204903",
  appId: "1:298195204903:web:3d53cd49e6fa11a15c8702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);