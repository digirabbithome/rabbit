// js/sidebar.js
export function loadSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div style="padding: 1em; background-color: #f0f0f0; height: 100vh;">
      <h3>📋 工具列</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li><a href="#" onclick="window.location.href='dashboard.html'">每日工作</a></li>
        <li><a href="#" onclick="logout()">登出</a></li>
      </ul>
    </div>
  `;
}
