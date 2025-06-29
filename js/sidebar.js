// js/sidebar.js
export function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div style="padding: 1rem; background-color: #f0f0f0; height: 100vh;">
      <h2>📋 工具列</h2>
      <ul style="list-style: none; padding: 0;">
        <li><button id="daily-tasks-btn">每日工作</button></li>
        <li><button id="logout-btn">登出</button></li>
      </ul>
    </div>
  `;

  document.getElementById('daily-tasks-btn').addEventListener('click', () => {
    window.location.href = '/dashboard.html';
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('nickname');
    localStorage.removeItem('user');
    window.location.href = '/';
  });
}
