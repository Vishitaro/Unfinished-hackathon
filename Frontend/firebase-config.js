import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMQI2XPUKrloW9pWPohNr7xkEnl0nJbnk",
    authDomain: "edu-hub-58d88.firebaseapp.com",
    databaseURL: "https://edu-hub-58d88-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "edu-hub-58d88",
    storageBucket: "edu-hub-58d88.firebasestorage.app",
    messagingSenderId: "665261392510",
    appId: "1:665261392510:web:4ca21ddb9a319acadb8e2f",
    measurementId: "G-B6VPXBP36E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

export { auth, provider, db, doc, setDoc, getDoc };
