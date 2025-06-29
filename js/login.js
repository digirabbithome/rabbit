import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("login-btn").onclick = () => {
  const email = document.getElementById("email").value;
  const pw = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pw)
    .then(() => (window.location.href = "dashboard.html"))
    .catch((error) => {
      document.getElementById("login-error").textContent = "登入失敗：" + error.message;
    });
};
