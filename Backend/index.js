

















import { initializeApp } from "firebase/app";
const firebaseApp = initializeApp();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

















































const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
console.log("Server is running...");