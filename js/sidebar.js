
import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './firebase.js';

export function bindSidebarEvents() {
  document.getElementById("btnDailyTasks")?.addEventListener("click", loadDailyTasks);
  document.getElementById("btnAddUser")?.addEventListener("click", loadAddUserForm);
  document.getElementById("btnMemberManage")?.addEventListener("click", loadMemberManagement);
  document.getElementById("btnLogout")?.addEventListener("click", logout);
}
