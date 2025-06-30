import { logout } from './firebase.js';

export function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <h3>📋 工具列</h3>
    <ul>
      <li><a href="#" id="dailyTasksLink">每日工作</a></li>
      <li><a href="#" id="logoutLink">登出</a></li>
    </ul>
  `;
  document.getElementById('logoutLink').addEventListener('click', logout);
}
