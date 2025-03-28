import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

document.getElementById("google-login").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Welcome, ${user.displayName}!`);
    window.location.href = "dashboard.html"; // Redirect after login
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In failed: " + error.message);
  }
});
