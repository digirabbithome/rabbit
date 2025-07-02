import { loadDailyTasks } from './dailyTasks.js';

export function showDashboard(user) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <h2>🎉 歡迎 ${user.email}！</h2>
    <p>請從左側選單選擇功能。</p>
  `;

  // 顯示左側選單
  document.getElementById('sidebar').style.display = 'block';
}