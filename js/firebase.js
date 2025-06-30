import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
  storageBucket: "rabbithome-auth.firebasestorage.app",
  messagingSenderId: "50928677930",
  appId: "1:50928677930:web:e8eff13c8028b888537f53"
};

export function initializeFirebase() {
  initializeApp(firebaseConfig);
}

export function login(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      alert("登入失敗：" + error.message);
    });
}

export function checkAuth() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) resolve(user);
      else window.location.href = "index.html";
    });
  });
}

export function logout() {
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}
