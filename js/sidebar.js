
import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  const btnDaily = document.querySelector("button[onclick=\"loadDailyTasks()\"]");
  const btnAddUser = document.querySelector("button[onclick=\"loadAddUserForm()\"]");
  const btnMember = document.querySelector("button[onclick=\"loadMemberManagement()\"]");
  const btnLogout = document.querySelector("button[onclick=\"logout()\"]");

  if (btnDaily) btnDaily.addEventListener("click", loadDailyTasks);
  if (btnAddUser) btnAddUser.addEventListener("click", loadAddUserForm);
  if (btnMember) btnMember.addEventListener("click", loadMemberManagement);
  if (btnLogout) btnLogout.addEventListener("click", logout);
});
