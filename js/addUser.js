
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
  storageBucket: "rabbithome-auth.appspot.com",
  messagingSenderId: "50928677930",
  appId: "1:50928677930:web:e8eff13c8028b888537f53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function loadAddUserForm() {
  const html = `
    <h2>👤 新增帳號</h2>
    <input type="email" id="email" placeholder="Email" />
    <input type="text" id="name" placeholder="姓名" />
    <input type="date" id="birthday" placeholder="生日" />
    <input type="text" id="nickname" placeholder="綽號" />
    <input type="password" id="password" placeholder="密碼" />
    <select id="group">
      <option value="">請選擇群組</option>
      <option value="外場">外場</option>
      <option value="內場">內場</option>
      <option value="美編">美編</option>
      <option value="出貨">出貨</option>
    </select>
    <button id="submitUser">送出</button>
    <div id="resultMsg" style="margin-top:10px;"></div>
  `;
  const main = document.getElementById("mainContent");
  main.innerHTML = html;

  document.getElementById("submitUser").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const birthday = document.getElementById("birthday").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const group = document.getElementById("group").value;

    const msg = document.getElementById("resultMsg");
    if (!email || !name || !birthday || !nickname || !password || !group) {
      msg.textContent = "❌ 請填寫所有欄位";
      msg.style.color = "red";
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        email,
        name,
        birthday,
        nickname,
        password,
        group
      });
      msg.textContent = "✅ 新增成功！";
      msg.style.color = "green";
    } catch (e) {
      msg.textContent = "❌ 新增失敗：" + e.message;
      msg.style.color = "red";
    }
  });
}
