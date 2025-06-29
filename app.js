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

loginBtn.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("登入失敗：" + e.message);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginSection.style.display = "none";
    const uid = user.uid;
    const nicknameRef = doc(db, "nicknames", uid);
    const nicknameSnap = await getDoc(nicknameRef);
    if (nicknameSnap.exists()) {
      showDashboard(nicknameSnap.data().nickname);
    } else {
      nicknameSection.style.display = "block";
      document.getElementById("saveNicknameBtn").onclick = async () => {
        const nickname = document.getElementById("nickname").value;
        await setDoc(nicknameRef, { nickname });
        nicknameSection.style.display = "none";
        showDashboard(nickname);
      };
    }
  }
});

async function showDashboard(nickname) {
  dashboard.style.display = "block";
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

  const querySnap = await getDocs(collection(db, "logs"));
  logList.innerHTML = "";
  querySnap.forEach((doc) => {
    const data = doc.data();
    const logTime = data.time?.seconds ? new Date(data.time.seconds * 1000).toLocaleTimeString() : "";
    const li = document.createElement("li");
    li.innerText = `✔️ ${data.nickname || data.email} 在 ${logTime} 完成`;
    logList.appendChild(li);
  });
}
