// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtBwZ24wvsECyXsQ7-fAKNV5uggfsTKks",
  authDomain: "mongo-volunteer-lagbe.firebaseapp.com",
  projectId: "mongo-volunteer-lagbe",
  storageBucket: "mongo-volunteer-lagbe.firebasestorage.app",
  messagingSenderId: "1085850838366",
  appId: "1:1085850838366:web:284b95bb3f11a9c0e3dbcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;