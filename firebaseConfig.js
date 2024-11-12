import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2_zlEjXwp3PVD636AadK0vHs6V4YiU9c",
    authDomain: "bookapp-d0e45.firebaseapp.com",
    projectId: "bookapp-d0e45",
    storageBucket: "bookapp-d0e45.firebasestorage.app",
    messagingSenderId: "737888229773",
    appId: "1:737888229773:web:d2334cf5c643d5a00145c4"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
