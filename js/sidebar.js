import { logout } from './firebase.js';
export function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <h3>📋 工具列</h3>
    <button id="daily">每日工作</button>
    <button onclick="logout()">登出</button>
  `;
  document.getElementById('daily').onclick = () => {
    import('./dailyTasks.js').then(module => {
      module.loadDailyTasks(JSON.parse(localStorage.getItem('user')));
    });
  };
}