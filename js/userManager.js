import { db, auth } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { updatePassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

export async function loadUserManager() {
  const main = document.getElementById('main-content');
  main.innerHTML = "<h2>👥 會員管理</h2><div id='user-list'></div><hr><div id='password-section'></div>";

  const userList = document.getElementById('user-list');
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `📧 ${data.email}｜👤 ${data.name}｜🎂 ${data.birthday}｜🧸 ${data.nickname}｜🏷️ ${data.group || '未分組'}`;
    userList.appendChild(div);
  });

  const passwordSection = document.getElementById('password-section');
  passwordSection.innerHTML = `
    <h3>🔐 修改我的密碼</h3>
    <input type="password" id="new-pass" placeholder="新密碼" />
    <button id="update-pass">修改密碼</button>
    <p id="pass-status"></p>
  `;

  document.getElementById('update-pass').onclick = async () => {
    const newPass = document.getElementById('new-pass').value;
    const user = auth.currentUser;
    const status = document.getElementById('pass-status');
    try {
      await updatePassword(user, newPass);
      status.style.color = "green";
      status.textContent = "✅ 密碼修改成功";
    } catch (err) {
      status.style.color = "red";
      status.textContent = "❌ 錯誤：" + err.message;
    }
  };
}