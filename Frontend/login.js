import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});
