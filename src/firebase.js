// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrq2P5rVOA5ydoXXqsWZOpo6lEsMn63u0",
  authDomain: "genesis-vue-app.firebaseapp.com",
  projectId: "genesis-vue-app",
  storageBucket: "genesis-vue-app.firebasestorage.app",
  messagingSenderId: "309008179846",
  appId: "1:309008179846:web:3d4833f856b43c8d87e707",
  measurementId: "G-KY48SJZ6RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();