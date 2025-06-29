import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

let currentUser = null;
let currentNickname = null;

const today = new Date();
const formattedDate = today.toLocaleDateString("zh-TW");
document.getElementById("mainTitle").textContent = `🎉 數位小兔 ${formattedDate} 工作流程！`;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const email = user.email;
    const nicknameRef = doc(db, "nicknames", email);
    const nicknameSnap = await getDoc(nicknameRef);

    if (nicknameSnap.exists()) {
      currentNickname = nicknameSnap.data().nickname;
      document.getElementById("nickname").textContent = `哈囉，${currentNickname}！`;

      checkWorkStatus();
    } else {
      window.location.href = "nickname.html";
    }
  } else {
    window.location.href = "index.html";
  }
});

async function checkWorkStatus() {
  const logRef = doc(db, "worklog", formattedDate);
  const logSnap = await getDoc(logRef);

  if (logSnap.exists()) {
    const data = logSnap.data();
    if (data[currentNickname]) {
      const time = data[currentNickname];
      document.getElementById("completedStatus").textContent =
        `✔️ ${currentNickname} 在 ${time} 完成`;
    }
  } else {
    document.getElementById("completedStatus").textContent = "尚未完成今日工作";
  }
}

document.getElementById("markDone").textContent = "🕤 9:30 阿寶交代";
document.getElementById("markDone").addEventListener("click", async () => {
  const now = new Date();
  const timeString = now.toTimeString().split(" ")[0];

  const logRef = doc(db, "worklog", formattedDate);
  await setDoc(logRef, {
    [currentNickname]: timeString
  }, { merge: true });

  document.getElementById("completedStatus").textContent =
    `✔️ ${currentNickname} 在 ${timeString} 完成`;
});

document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
