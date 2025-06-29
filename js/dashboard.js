// js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
    <h1>🎉 數位小兔 工作區</h1>
    <p>哈囉，小兔！這是你的主畫面！</p>
  `;

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <ul>
      <li><a href="#" onclick="alert('每日工作：尚未實作')">📋 每日工作</a></li>
      <li><a href="#" onclick="alert('登出：尚未實作')">🚪 登出</a></li>
    </ul>
  `;
});
