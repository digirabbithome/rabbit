
// js/dailyTasks.js
export function loadDailyTasks(user) {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🎉 歡迎 ${user.email}！</h2>
    <p>這裡是每日工作頁面。</p>
    <!-- 可加上工作清單顯示 -->
  `;
}
