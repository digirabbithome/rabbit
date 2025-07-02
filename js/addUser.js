
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export function loadAddUserForm() {
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <h2>👤 新增帳號</h2>
    <form id="addUserForm">
      <input type="email" id="email" placeholder="Email" required /><br>
      <input type="text" id="name" placeholder="姓名" required /><br>
      <input type="date" id="birthday" placeholder="生日" required /><br>
      <input type="text" id="nickname" placeholder="綽號" required /><br>
      <select id="group" required>
        <option value="">請選擇群組</option>
        <option value="外場">外場</option>
        <option value="內場">內場</option>
        <option value="美編">美編</option>
        <option value="出貨">出貨</option>
      </select><br>
      <input type="password" id="password" placeholder="密碼" required /><br>
      <button type="submit">送出</button>
    </form>
    <p id="addUserStatus"></p>
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
    const status = document.getElementById("addUserStatus");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        name,
        birthday,
        nickname,
        group
      });

      status.textContent = "✅ 成功新增帳號！";
      form.reset();
    } catch (error) {
      console.error("新增帳號失敗", error);
      status.textContent = `❌ 錯誤：${error.message}`;
    }
  });
}
