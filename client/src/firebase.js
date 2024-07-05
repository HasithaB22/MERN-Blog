// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //vite use --> ("import.meta") to get the value of the environment variable
  authDomain: "mern-blog-36c5e.firebaseapp.com",
  projectId: "mern-blog-36c5e",
  storageBucket: "mern-blog-36c5e.appspot.com",
  messagingSenderId: "668650545612",
  appId: "1:668650545612:web:af88e6df5f8319504f7d69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

