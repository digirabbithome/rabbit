// js/dailyTasks.js
import { db } from './firebase.js';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js';

const taskList = [
  '9:30 阿寶交代',
  '9:30 點錢',
  '9:30 QA',
  '11:30 QA',
  '1:30 QA',
  '3:00 QA',
  '5:00 QA',
  '6:30 QA',
  '3:00 叫貨',
  '6:30 叫貨',
  '每日阿寶交代',
  '每日花花LINE',
  '每日追蹤開年'
];

export async function loadDailyTasks(user) {
  const content = document.getElementById('content');
  const nickname = localStorage.getItem('nickname') || user.email;
  const today = new Date().toISOString().split('T')[0];

  let html = `<h2>🎉 數位小兔 ${today} 工作流程！</h2>`;
  html += `<p>哈囉，${nickname}！</p>`;

  for (const task of taskList) {
    html += `<div>
      <button data-task="${task}">🕤 ${task}</button>
      <span id="status-${task}">載入中...</span>
    </div>`;
  }

  content.innerHTML = html;

  for (const task of taskList) {
    const q = query(collection(db, 'tasks'), where('date', '==', today), where('task', '==', task));
    const querySnapshot = await getDocs(q);

    const results = [];
    querySnapshot.forEach(doc => {
      const d = doc.data();
      const time = new Date(d.timestamp.seconds * 1000).toTimeString().slice(0, 5);
      results.push(`✔️ ${d.nickname} 在 ${time}`);
    });

    document.getElementById(`status-${task}`).innerText = results.join(' ');
  }

  document.querySelectorAll('button[data-task]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const task = btn.getAttribute('data-task');
      const taskRef = doc(collection(db, 'tasks'));
      await setDoc(taskRef, {
        nickname,
        task,
        date: today,
        timestamp: serverTimestamp()
      });
      loadDailyTasks(user);
    });
  });
}
