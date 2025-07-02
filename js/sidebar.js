document.addEventListener('DOMContentLoaded', () => {
  const dailyTaskBtn = document.getElementById('menu-daily');
  if (dailyTaskBtn) {
    dailyTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadDailyTasks(); // 這個函式在 dailyTasks.js 中定義
    });
  }
});