// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1cHL5omMJiJc0YW9TQ8jpdQkxDvYcdP0",
  authDomain: "too-many-thoughts.firebaseapp.com",
  projectId: "too-many-thoughts",
  storageBucket: "too-many-thoughts.appspot.com",
  messagingSenderId: "1092276074201",
  appId: "1:1092276074201:web:b0095ae77861406d8ab0c8",
  measurementId: "G-1X5QM9J9QL"
};

export const firebaseInstance = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
const analytics = getAnalytics(firebaseInstance);