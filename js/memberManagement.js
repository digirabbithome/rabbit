
import { getAuth, updatePassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export async function loadMemberManagement() {
  const main = document.getElementById("mainContent");
  main.innerHTML = "<h2>👥 會員管理</h2><div id='memberList'></div><div id='passwordForm'></div>";

  const memberList = document.getElementById("memberList");
  const passwordForm = document.getElementById("passwordForm");

  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let listHTML = "<ul>";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      listHTML += `<li>📧 ${data.email}｜👤 ${data.name}｜🎂 ${data.birthday}｜🧸 ${data.nickname}｜🏷️ ${data.group}</li>`;
    });
    listHTML += "</ul>";
    memberList.innerHTML = listHTML;
  } catch (error) {
    memberList.innerHTML = `<p>❌ 無法讀取會員資料：${error.message}</p>`;
  }

  // 顯示密碼修改表單
  passwordForm.innerHTML = `
    <h3>🔐 修改自己的密碼</h3>
    <form id="changePasswordForm">
      <input type="password" id="newPassword" placeholder="新密碼" required />
      <button type="submit">修改密碼</button>
    </form>
    <p id="passwordStatus"></p>
  `;

  document.getElementById("changePasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const status = document.getElementById("passwordStatus");

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      status.textContent = "✅ 密碼修改成功！";
    } catch (error) {
      console.error("密碼修改失敗", error);
      status.textContent = `❌ 錯誤：${error.message}`;
    }
  });
}
