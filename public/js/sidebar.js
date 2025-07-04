import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { loadDailyTasks } from './dailyTasks.js';
import { logout } from './auth.js';

window.addEventListener('DOMContentLoaded', () => {
  function safeBind(id, handler) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", handler);
  }

  safeBind("dailyTaskBtn", loadDailyTasks);
  safeBind("addUserBtn", loadAddUserForm);
  safeBind("memberBtn", loadMemberManagement);
  safeBind("logoutBtn", logout);
});
