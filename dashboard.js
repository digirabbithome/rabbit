
const firebaseConfig = {
  apiKey: "AIzaSyANuDJyJuQbxnXq-FTyaTAI9mSc6zpmuWs",
  authDomain: "rabbithome-auth.firebaseapp.com",
  projectId: "rabbithome-auth"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const appDiv = document.getElementById("app");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const email = user.email;

  const nicknameDoc = await db.collection("nicknames").doc(uid).get();
  const nickname = nicknameDoc.exists ? nicknameDoc.data().nickname : email;

  const todayKey = new Date().toISOString().slice(0, 10);
  const docRef = db.collection("worklogs").doc(todayKey);

  const docSnap = await docRef.get();
  const data = docSnap.exists ? docSnap.data() : {};

  const completedTime = data[nickname];

  let statusList = "";
  for (const [nick, time] of Object.entries(data)) {
    statusList += `✔️ ${nick} 在 ${time}<br>`;
  }

  appDiv.innerHTML = `
    <h2>🎉 數位小兔 ${todayKey} 工作流程！</h2>
    <p>哈囉，${nickname}！</p>
    <p><button id="finishBtn">🕤 9:30 阿寶交代</button></p>
    <div id="resultArea">${statusList}</div>
  `;

  document.getElementById("finishBtn").addEventListener("click", async () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("zh-TW", { hour: '2-digit', minute: '2-digit', hour12: false });
    await docRef.set({ [nickname]: timeStr }, { merge: true });
    location.reload();
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.signOut();
  });
});
