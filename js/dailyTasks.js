// js/dailyTasks.js
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 所有每日任務項目
const taskList = [
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

export async function loadDailyTasks(user) {
  const db = getFirestore();
  const content = document.getElementById("content");
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const userNickname = user.displayName || user.email;

  const taskResults = {};

  // 讀取所有人的完成狀況
  const allUsersSnapshot = await getDocs(collection(db, "users"));
  allUsersSnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.nickname) {
      taskResults[data.nickname] = {};
    }
  });

  const tasksSnapshot = await getDocs(collection(db, "tasks", today, "records"));
  tasksSnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const nickname = data.nickname || data.email;
    const task = data.task;
    const time = data.time?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!taskResults[nickname]) taskResults[nickname] = {};
    taskResults[nickname][task] = time;
  });

  // 建立畫面
  let html = `<h2>🎉 數位小兔 ${today} 工作流程！</h2>`;
  html += `<h3>哈囉，${userNickname}！</h3>`;

  taskList.forEach(task => {
    html += `<div>
      <button onclick="completeTask('${task}')">🕤 ${task}</button>`;

    for (const [nickname, records] of Object.entries(taskResults)) {
      if (records[task]) {
        html += ` ✔️ ${nickname} 在 ${records[task]}`;
      }
    }

    html += `</div>`;
  });

  content.innerHTML = html;
}

// 將完成狀況寫入 Firestore
window.completeTask = async function(taskName) {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const nickname = user.displayName || user.email;
  const today = new Date().toISOString().split("T")[0];

  const recordRef = doc(collection(db, "tasks", today, "records"), `${nickname}_${taskName}`);
  await setDoc(recordRef, {
    email: user.email,
    nickname,
    task: taskName,
    time: serverTimestamp(),
  });

  loadDailyTasks(user); // 更新畫面
};
