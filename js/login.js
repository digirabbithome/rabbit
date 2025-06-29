// login.js: handles login functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
  storageBucket: "rabbithome-auth.appspot.com",
  messagingSenderId: "50928677930",
  appId: "1:50928677930:web:e8eff13c8028b888537f53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 插入登入表單
document.body.innerHTML = `
  <h1>登入 Rabbithome</h1>
  <form id="loginForm">
    <input type="email" id="email" placeholder="Email" required /><br>
    <input type="password" id="password" placeholder="Password" required /><br>
    <button type="submit">登入</button>
  </form>
`;

// 處理登入邏輯
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'dashboard.html'; // 登入成功轉跳
  } catch (error) {
    alert('登入失敗：' + error.message);
  }
});
