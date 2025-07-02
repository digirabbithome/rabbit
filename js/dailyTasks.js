import { db } from './firebase.js';
import { getDoc, setDoc, doc, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function loadDailyTasks() {
  const main = document.getElementById('main-content');
  const today = new Date().toISOString().split('T')[0];
  const nickname = localStorage.getItem('nickname') || '匿名';

  const taskList = ['阿寶交代', '出貨準備', '社群發文'];

  main.innerHTML = `
    <h2>📋 每日工作 (${today})</h2>
    <div id="task-buttons" style="display: flex; gap: 10px; flex-wrap: wrap;"></div>
    <hr>
    <div id="task-records"></div>
  `;

  const taskBtnContainer = document.getElementById('task-buttons');
  const recordContainer = document.getElementById('task-records');

  taskList.forEach(taskName => {
    const btn = document.createElement('button');
    btn.textContent = taskName;
    btn.style = 'padding: 10px; background: #eee; border: 1px solid #aaa; cursor: pointer;';
    btn.onclick = async () => {
      const now = new Date();
      const hhmm = now.toTimeString().slice(0, 5);

      const taskId = `${nickname}_${hhmm}_${taskName}`;
      const taskRef = doc(db, 'tasks', today, 'records', taskId);

      await setDoc(taskRef, {
        nickname,
        task: taskName,
        timestamp: hhmm
      });

      const line = `🕤 ${taskName} ✔️ ${nickname} 在 ${hhmm} 完成`;
      const p = document.createElement('p');
      p.textContent = line;
      recordContainer.appendChild(p);
    };

    taskBtnContainer.appendChild(btn);
  });
}