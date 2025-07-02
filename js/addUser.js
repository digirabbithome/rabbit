
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from './firebase.js';

export function loadAddUserForm() {
  const content = document.getElementById("mainContent");
  content.innerHTML = `
    <h2>👤 新增帳號</h2>
    <form id="addUserForm">
      <label>Email：<input type="email" id="email" required></label><br>
      <label>姓名：<input type="text" id="name" required></label><br>
      <label>生日：<input type="date" id="birthday" required></label><br>
      <label>綽號：<input type="text" id="nickname" required></label><br>
      <label>密碼：<input type="password" id="password" required></label><br>
      <label>群組：
        <select id="group">
          <option value="外場">外場</option>
          <option value="內場">內場</option>
          <option value="美編">美編</option>
          <option value="出貨">出貨</option>
        </select>
      </label><br>
      <button type="submit">送出</button>
    </form>
    <div id="addUserResult"></div>
  `;

  const form = document.getElementById("addUserForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const birthday = document.getElementById("birthday").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const group = document.getElementById("group").value;
    const db = getFirestore(app);
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      await addDoc(collection(db, "users"), {
        email,
        name,
        birthday,
        nickname,
        group,
        uid
      });
      document.getElementById("addUserResult").innerText = "✅ 帳號新增成功！";
      form.reset();
    } catch (error) {
      document.getElementById("addUserResult").innerText = "❌ 發生錯誤：" + error.message;
    }
  });
}
