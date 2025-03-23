require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json"); // Replace with your Firebase service account JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const usersCollection = db.collection("users");

const app = express();
app.use(express.json());
app.use(cors());

// Generate JWT Token for API Authentication
const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ Google Login Route
app.post("/google-login", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify Google ID Token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Check if the user already exists in Firestore
    const userDoc = await usersCollection.doc(uid).get();
    if (!userDoc.exists) {
      // Create a new user in Firestore
      await usersCollection.doc(uid).set({ email, name, picture });
    }

    // Generate JWT for session management
    const token = generateToken(uid);
    res.json({ message: "Google Login Successful", token });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google Token" });
  }
});

// ✅ Middleware to Protect Routes
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ✅ Protected Route Example
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome User ${req.user.uid}!`, data: "Protected Data" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
