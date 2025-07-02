import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './firebase.js';

window.addEventListener("DOMContentLoaded", () => {
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el && typeof fn === "function") {
      el.addEventListener("click", fn);
    }
  };

  bind("dailyTasksBtn", loadDailyTasks);
  bind("addUserBtn", loadAddUserForm);
  bind("memberMgmtBtn", loadMemberManagement);
  bind("logoutBtn", logout);
});