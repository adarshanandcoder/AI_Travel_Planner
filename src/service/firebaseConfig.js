// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDd5h9Y8nyWVcOEszZyw53BlqYQw0DW_U",
  authDomain: "ai-travel-planner-c2ff7.firebaseapp.com",
  projectId: "ai-travel-planner-c2ff7",
  storageBucket: "ai-travel-planner-c2ff7.appspot.com",
  messagingSenderId: "681741566655",
  appId: "1:681741566655:web:25913b9308242453d87c0a",
  measurementId: "G-S5Q60G2VKL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)