
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, getDocs, collection, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth",
  storageBucket: "rabbithome-auth.appspot.com",
  messagingSenderId: "50928677930",
  appId: "1:50928677930:web:e8eff13c8028b888537f53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const tasks = [
  "9:30 阿寶交代", "9:30 點錢", "9:30 QA", "11:30 QA", "1:30 QA",
  "3:00 QA", "5:00 QA", "6:30 QA", "3:00 叫貨", "6:30 叫貨",
  "每日阿寶交代", "每日花花LINE", "每日追蹤開年"
];

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderTasks(nickname, todayData) {
  const list = document.getElementById("task-list");
  const buttons = document.getElementById("task-buttons");
  list.innerHTML = "";
  buttons.innerHTML = "";

  tasks.forEach(task => {
    const row = document.createElement("div");
    row.className = "task-row";

    const isDone = todayData[task]?.[nickname];
    const display = isDone ? `✔️ ${nickname} 在 ${formatTime(isDone.toDate())}` : "";

    const btn = document.createElement("button");
    btn.textContent = task;
    btn.onclick = async () => {
      const ref = doc(db, "worklog", new Date().toISOString().split("T")[0]);
      await setDoc(ref, {
        [task]: {
          ...todayData[task],
          [nickname]: new Date()
        }
      }, { merge: true });
    };

    row.appendChild(btn);
    if (display) {
      const span = document.createElement("span");
      span.textContent = " " + display;
      row.appendChild(span);
    }

    buttons.appendChild(row);

    const li = document.createElement("li");
    li.textContent = task;
    list.appendChild(li);
  });
}

onAuthStateChanged(auth, async user => {
  if (!user) return location.href = "/";
  const uid = user.uid;
  const nicknameRef = doc(db, "nicknames", uid);
  const snap = await getDoc(nicknameRef);
  const nickname = snap.exists() ? snap.data().nickname : user.email;

  document.getElementById("welcome-message").textContent =
    `🎉 數位小兔 ${new Date().toLocaleDateString()} 工作流程！\n哈囉，${nickname}！`;

  const todayDoc = doc(db, "worklog", new Date().toISOString().split("T")[0]);
  onSnapshot(todayDoc, docSnap => {
    renderTasks(nickname, docSnap.exists() ? docSnap.data() : {});
  });
});

window.logout = function () {
  signOut(auth).then(() => location.href = "/");
};
