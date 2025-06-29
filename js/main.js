import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot, serverTimestamp, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

function formatTime(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function renderDashboard(nickname, uid) {
  const container = document.getElementById("app");
  container.innerHTML = `<h2>🎉 數位小兔 ${new Date().toLocaleDateString()} 工作流程！</h2>
  <p>哈囉，${nickname}！</p>
  <div id="task-list"></div>
  <button id="logout">登出</button>`;
  document.getElementById("logout").onclick = () => signOut(auth);

  const today = new Date().toISOString().split("T")[0];
  const dayDoc = doc(db, "days", today);

  onSnapshot(dayDoc, (snapshot) => {
    const data = snapshot.data() || {};
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const people = data[task] || {};
      const results = Object.entries(people)
        .map(([name, ts]) => `✔️ ${name} 在 ${formatTime(ts.toDate())}`)
        .join("  ");
      const line = document.createElement("p");
      line.textContent = `🕤 ${task} ${results}`;
      taskList.appendChild(line);
    });
  });

  tasks.forEach((task) => {
    const btn = document.createElement("button");
    btn.textContent = `🕤 ${task}`;
    btn.onclick = async () => {
      const today = new Date().toISOString().split("T")[0];
      const ref = doc(db, "days", today);
      const snap = await getDoc(ref);
      const prev = snap.exists() ? snap.data() : {};
      const entry = prev[task] || {};
      entry[nickname] = serverTimestamp();
      await updateDoc(ref, { [task]: entry }).catch(() =>
        setDoc(ref, { [task]: entry })
      );
    };
    container.appendChild(btn);
  });
}

onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location.href = "index.html");
  const profileRef = doc(db, "users", user.uid);
  const profileSnap = await getDoc(profileRef);
  const nickname = profileSnap.exists() ? profileSnap.data().nickname : user.email;
  renderDashboard(nickname, user.uid);
});
