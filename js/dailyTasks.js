import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const taskList = [
  "9:30 阿寶交代", "9:30 點錢", "9:30 QA", "11:30 QA", "1:30 QA", "3:00 QA",
  "5:00 QA", "6:30 QA", "3:00 叫貨", "6:30 叫貨",
  "每日阿寶交代", "每日花花LINE", "每日追蹤開年"
];

export async function loadDailyTasks(user) {
  const content = document.getElementById('content');
  const db = getFirestore();
  const today = new Date().toISOString().split('T')[0];
  const recordsRef = collection(db, 'tasks', today, 'records');
  const recordsSnap = await getDocs(recordsRef);
  const nicknameMap = {};
  const nicknameSnap = await getDocs(collection(db, 'nicknames'));
  nicknameSnap.forEach(doc => {
    nicknameMap[doc.id] = doc.data().nickname;
  });

  const recordMap = {};
  recordsSnap.forEach(doc => {
    const [who, task] = doc.id.split('_');
    if (!recordMap[task]) recordMap[task] = [];
    recordMap[task].push(`${nicknameMap[who] || who} 在 ${doc.data().time}`);
  });

  content.innerHTML = `<h2>🎉 數位小兔 ${today} 工作流程！</h2>`;
  taskList.forEach(task => {
    const taskBtn = document.createElement('button');
    taskBtn.textContent = `🕤 ${task}`;
    taskBtn.onclick = async () => {
      const now = new Date().toTimeString().split(' ')[0].slice(0,5);
      const docId = user.email + '_' + task;
      await setDoc(doc(recordsRef, docId), { time: now });
      loadDailyTasks(user);
    };
    content.appendChild(taskBtn);
    const doneLine = document.createElement('div');
    doneLine.textContent = (recordMap[task] || []).join('　');
    content.appendChild(doneLine);
  });
  localStorage.setItem('user', JSON.stringify(user));
}