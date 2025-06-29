
// dashboard.js: Enhanced dashboard with shared work status

import { getFirestore, collection, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore-lite.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const tasks = [
  "9:30 阿寶交代", "9:30 點錢", "9:30 QA", "11:30 QA", "1:30 QA",
  "3:00 QA", "5:00 QA", "6:30 QA", "3:00 叫貨", "6:30 叫貨",
  "每日阿寶交代", "每日花花LINE", "每日追蹤開年"
];

function getToday() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function renderDashboard(nickname) {
  const content = document.getElementById("content");
  const today = getToday();
  const dateHeader = `🎉 數位小兔 ${today} 工作流程！`;
  const greeting = `哈囉，${nickname}！`;
  content.innerHTML = `<h3>${dateHeader}</h3><p>${greeting}</p>`;

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.textContent = `🕤 ${task}`;
    taskDiv.id = `task-${task}`;

    const btn = document.createElement("button");
    btn.textContent = `✔️ ${task}`;
    btn.onclick = async () => {
      const time = new Date().toTimeString().split(":").slice(0, 2).join(":");
      const ref = doc(db, "daily", today);
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : {};
      if (!data[task]) data[task] = [];
      if (!data[task].some(entry => entry.name === nickname)) {
        data[task].push({ name: nickname, time });
        await setDoc(ref, data);
      }
    };

    content.appendChild(taskDiv);
    content.appendChild(btn);
  });

  // Listen for updates
  const ref = doc(db, "daily", today);
  onSnapshot(ref, (snap) => {
    const data = snap.exists() ? snap.data() : {};
    for (const task in data) {
      const line = document.getElementById(`task-${task}`);
      if (line) {
        const logs = data[task].map(entry => `✔️ ${entry.name} 在 ${entry.time}`).join(" ");
        line.textContent = `🕤 ${task} ${logs}`;
      }
    }
  });
}

function setupSidebar(nickname) {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <h3>📋 工具列</h3>
    <button onclick="location.reload()">每日工作</button>
    <button onclick="firebaseSignOut()">登出</button>
  `;
}

function firebaseSignOut() {
  signOut(auth).then(() => location.href = "/");
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "/";
    return;
  }
  const uid = user.uid;
  const nicknameRef = doc(db, "nicknames", uid);
  const nicknameSnap = await getDoc(nicknameRef);
  const nickname = nicknameSnap.exists() ? nicknameSnap.data().name : "使用者";
  setupSidebar(nickname);
  renderDashboard(nickname);
});
