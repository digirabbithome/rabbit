import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnDaily")?.addEventListener("click", loadDailyTasks);
  document.getElementById("btnAddUser")?.addEventListener("click", loadAddUserForm);
  document.getElementById("btnMember")?.addEventListener("click", loadMemberManagement);
  document.getElementById("btnLogout")?.addEventListener("click", logout);
});
