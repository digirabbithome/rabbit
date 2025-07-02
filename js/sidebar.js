document.addEventListener('DOMContentLoaded', () => {
  const dailyTaskBtn = document.getElementById('menu-daily');
  if (dailyTaskBtn) {
    dailyTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadDailyTasks();
    });
  }
});