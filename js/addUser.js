import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { db, auth } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export function loadAddUserForm() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <h2>➕ 新增帳號</h2>
    <form id="add-user-form">
      <input type="email" id="new-email" placeholder="Email" required />
      <input type="password" id="new-password" placeholder="密碼" required />
      <input type="text" id="new-name" placeholder="姓名" required />
      <input type="text" id="new-nickname" placeholder="綽號" required />
      <input type="date" id="new-birthday" required />
      <select id="new-group" required>
        <option value="">請選擇群組</option>
        <option value="外場">外場</option>
        <option value="內場">內場</option>
        <option value="美編">美編</option>
        <option value="出貨">出貨</option>
      </select>
      <button type="submit">送出</button>
      <p id="add-user-status" style="color: red;"></p>
    </form>
  `;

  const form = document.getElementById('add-user-form');
  const status = document.getElementById('add-user-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form['new-email'].value;
    const password = form['new-password'].value;
    const name = form['new-name'].value;
    const nickname = form['new-nickname'].value;
    const birthday = form['new-birthday'].value;
    const group = form['new-group'].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        email, name, nickname, birthday, group
      });
      status.style.color = "green";
      status.textContent = "✅ 新增成功！";
      form.reset();
    } catch (err) {
      status.style.color = "red";
      status.textContent = "❌ 錯誤：" + err.message;
    }
  });
}