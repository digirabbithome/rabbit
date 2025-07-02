
import { loadDailyTasks, loadAddUserForm, loadMemberManagement, logout } from './sidebar.js';

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dailyTasksBtn")?.addEventListener("click", loadDailyTasks);
  document.getElementById("addUserBtn")?.addEventListener("click", loadAddUserForm);
  document.getElementById("memberMgmtBtn")?.addEventListener("click", loadMemberManagement);
  document.getElementById("logoutBtn")?.addEventListener("click", logout);
});
