import { logout } from './firebase.js';
import { loadDailyTasks } from './dailyTasks.js';

export function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <h3>📋 工具列</h3>
    <ul>
      <li><button id="dailyTasksBtn">每日工作</button></li>
      <li><button id="logoutBtn">登出</button></li>
    </ul>
  `;

  document.getElementById('dailyTasksBtn').addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    loadDailyTasks(user);
  });

  document.getElementById('logoutBtn').addEventListener('click', logout);
}
