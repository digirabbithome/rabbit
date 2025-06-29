
document.addEventListener("DOMContentLoaded", async () => {
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  const formatTime = (timestamp) => {
    const date = timestamp.toDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const uid = user.uid;
      const userDoc = await db.collection("nicknames").doc(uid).get();
      const nickname = userDoc.data()?.nickname || "未知使用者";

      document.body.innerHTML = `
        <div style="display: flex;">
          <div style="width: 200px; background: #f0f0f0; padding: 1em;">
            <div>📋 今日工作</div>
            <div><button onclick="logout()">登出</button></div>
          </div>
          <div style="flex-grow: 1; padding: 1em;">
            <h2>🎉 數位小兔 ${new Date().toISOString().split('T')[0]} 工作流程！</h2>
            <p>哈囉，${nickname}！</p>
            <div id="work-area">🕤 9:30 阿寶交代</div>
          </div>
        </div>
      `;

      const workArea = document.getElementById("work-area");

      const allDocs = await db.collection("nicknames").get();
      const results = [];

      allDocs.forEach(doc => {
        const data = doc.data();
        if (data.completed) {
          results.push(`✔️ ${data.nickname} 在 ${formatTime(data.completed)} 完成`);
        }
      });

      if (results.length) {
        workArea.innerHTML += "    " + results.join("、");
      }

      const button = document.createElement("button");
      button.textContent = "✔️ 完成今日工作";
      button.onclick = async () => {
        await db.collection("nicknames").doc(uid).update({
          completed: firebase.firestore.Timestamp.now()
        });
        location.reload();
      };
      workArea.appendChild(document.createElement("br"));
      workArea.appendChild(button);
    }
  });

  window.logout = () => {
    firebase.auth().signOut().then(() => {
      location.reload();
    });
  };
});
