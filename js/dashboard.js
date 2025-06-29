import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
  storageBucket: "rabbithome-auth.appspot.com",
  messagingSenderId: "50928677930",
  appId: "1:50928677930:web:e8eff13c8028b888537f53"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

const tasks = [
  "9:30 阿寶交代",
  "9:30 點錢",
  "9:30 QA",
  "11:30 QA",
  "1:30 QA",
  "3:00 QA",
  "5:00 QA",
  "6:30 QA",
  "3:00 叫貨",
  "6:30 叫貨",
  "每日阿寶交代",
  "每日花花LINE",
  "每日追蹤開年"
];

function renderSidebar() {
  sidebar.innerHTML = `
    <h2>📋 工具列</h2>
    <ul>
      <li><button id="btn-work">每日工作</button></li>
      <li><button id="btn-logout">登出</button></li>
    </ul>
  `;
  document.getElementById("btn-logout").onclick = () => {
    signOut(auth);
  };
  document.getElementById("btn-work").onclick = () => {
    loadDashboardUI();
  };
}

function formatTime(timestamp) {
  const date = timestamp.toDate();
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

async function loadDashboardUI() {
  const user = auth.currentUser;
  if (!user) return;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const nickname = userDoc.exists() ? userDoc.data().nickname : user.email;

  const today = new Date().toISOString().split("T")[0];
  const todayTasksRef = collection(db, "worklogs", today, "tasks");
  const allTaskDocs = await getDocs(todayTasksRef);

  const taskStatus = {};
  allTaskDocs.forEach(docSnap => {
    const task = docSnap.id;
    const data = docSnap.data();
    taskStatus[task] = data.completed || {};
  });

  let html = `<h2>🎉 數位小兔 ${today} 工作流程！</h2>`;
  html += `<p>哈囉，${nickname}！</p>`;

  for (const task of tasks) {
    html += `<div>🕤 ${task}`;

    const whoCompleted = taskStatus[task];
    for (const [nick, time] of Object.entries(whoCompleted || {})) {
      html += ` ✔️ ${nick} 在 ${formatTime(time)}`;
    }

    html += ` <button data-task="${task}">完成</button></div>`;
  }

  content.innerHTML = html;

  // 綁定完成按鈕
  document.querySelectorAll("button[data-task]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const task = btn.dataset.task;
      const user = auth.currentUser;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const nickname = userDoc.exists() ? userDoc.data().nickname : user.email;

      const taskRef = doc(db, "worklogs", today, "tasks", task);
      const taskSnap = await getDoc(taskRef);
      const existing = taskSnap.exists() ? taskSnap.data().completed || {} : {};

      existing[nickname] = serverTimestamp();
      await setDoc(taskRef, { completed: existing }, { merge: true });

      loadDashboardUI(); // Refresh
    });
  });
}

onAuthStateChanged(auth, async user => {
  if (user) {
    renderSidebar();
    await loadDashboardUI();
  } else {
    window.location.href = "index.html";
  }
});
