
import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './firebase.js';

document.addEventListener("DOMContentLoaded", () => {
  const btnDaily = document.getElementById("btnDailyTasks");
  const btnAddUser = document.getElementById("btnAddUser");
  const btnMember = document.getElementById("btnMemberManage");
  const btnLogout = document.getElementById("btnLogout");

  if (btnDaily) btnDaily.addEventListener("click", loadDailyTasks);
  if (btnAddUser) btnAddUser.addEventListener("click", loadAddUserForm);
  if (btnMember) btnMember.addEventListener("click", loadMemberManagement);
  if (btnLogout) btnLogout.addEventListener("click", logout);
});
