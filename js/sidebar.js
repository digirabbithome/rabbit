
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { loadDailyTasks } from './dailyTasks.js';
import { logout } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dailyTasksBtn").addEventListener("click", loadDailyTasks);
  document.getElementById("addUserBtn").addEventListener("click", loadAddUserForm);
  document.getElementById("memberMgmtBtn").addEventListener("click", loadMemberManagement);
  document.getElementById("logoutBtn").addEventListener("click", logout);
});
