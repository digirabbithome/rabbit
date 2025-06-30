import { logout } from './firebase.js';

export function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <h3>📋 工具列</h3>
    <ul style="list-style: none; padding-left: 0;">
      <li><a href="dashboard.html">每日工作</a></li>
      <li><a href="#" onclick="logout()">登出</a></li>
    </ul>
  `;
  window.logout = logout;
}
