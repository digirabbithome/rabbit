import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  doc, setDoc, getDoc, collection, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginSection = document.getElementById("login-section");
const nicknameSection = document.getElementById("nickname-section");
const dashboard = document.getElementById("dashboard");
const welcomeMsg = document.getElementById("welcomeMsg");
const markDoneBtn = document.getElementById("markDoneBtn");
const doneMsg = document.getElementById("doneMsg");
const logList = document.getElementById("logList");
const sidebar = document.getElementById("sidebar");

loginBtn.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("❌ 登入失敗：" + e.message);
    console.error(e);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginSection.style.display = "none";

    const uid = user.uid;
    const nicknameRef = doc(db, "nicknames", uid);
    try {
      const nicknameSnap = await getDoc(nicknameRef);
      if (nicknameSnap.exists()) {
        showDashboard(nicknameSnap.data().nickname);
      } else {
        nicknameSection.style.display = "block";
        document.getElementById("saveNicknameBtn").onclick = async () => {
          const nickname = document.getElementById("nickname").value.trim();
          if (!nickname) {
            alert("請輸入綽號！");
            return;
          }
          await setDoc(nicknameRef, { nickname });
          nicknameSection.style.display = "none";
          showDashboard(nickname);
        };
      }
    } catch (e) {
      alert("讀取綽號錯誤：" + e.message);
      console.error(e);
    }
  } else {
    loginSection.style.display = "block";
  }
});

async function showDashboard(nickname) {
  dashboard.style.display = "block";
  sidebar.style.display = "block";
  welcomeMsg.innerText = `哈囉 ${nickname}！`;

  const today = new Date().toISOString().split("T")[0];
  const doneRef = doc(db, "logs", today + "_" + nickname);
  const doneSnap = await getDoc(doneRef);
  if (doneSnap.exists()) {
    const time = new Date(doneSnap.data().time.seconds * 1000).toLocaleTimeString();
    doneMsg.innerText = `✔️ ${nickname} 已於 ${time} 完成`;
    markDoneBtn.disabled = true;
  }

  markDoneBtn.onclick = async () => {
    await setDoc(doneRef, {
      nickname,
      email: auth.currentUser.email,
      time: serverTimestamp()
    });
    doneMsg.innerText = `✔️ ${nickname} 已完成（更新中...）`;
    setTimeout(() => location.reload(), 1000);
  };

  // 顯示「今日完成清單」
  const querySnap = await getDocs(collection(db, "logs"));
  logList.innerHTML = "";
  const todayLogs = [];
  querySnap.forEach((doc) => {
    const data = doc.data();
    const dateKey = doc.id.split("_")[0];
    if (dateKey === today) {
      todayLogs.push({
        nickname: data.nickname || data.email,
        time: data.time?.seconds || 0
      });
    }
  });

  todayLogs.sort((a, b) => a.time - b.time);
  todayLogs.forEach(log => {
    const li = document.createElement("li");
    const timeStr = new Date(log.time * 1000).toLocaleTimeString();
    li.innerText = `✔️ ${log.nickname} 在 ${timeStr} 完成`;
    logList.appendChild(li);
  });
}
