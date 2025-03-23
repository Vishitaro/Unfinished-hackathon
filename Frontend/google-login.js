import { auth, provider, db, doc, setDoc, getDoc } from "./firebase-config.js";
import { signInWithPopup } from "firebase/auth";

document.querySelector("#google-login").addEventListener("click", async () => {
  try {
    // Open Google Sign-In popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Reference to the user's Firestore document
    const userRef = doc(db, "users", user.uid);

    // Check if the user already exists in Firestore
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      // If user doesn't exist, store them in Firestore
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        createdAt: new Date().toISOString(),
      });
    }

    // Store user details in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
      })
    );

    alert(`Welcome, ${user.displayName}!`);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In failed: " + error.message);
  }
});
