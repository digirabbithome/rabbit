import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './firebase.js';

window.addEventListener("DOMContentLoaded", () => {
  const safeBind = (id, handler) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", handler);
    } else {
      console.warn(`元素 #${id} 不存在，無法綁定`);
    }
  };

  safeBind("dailyTasksBtn", loadDailyTasks);
  safeBind("addUserBtn", loadAddUserForm);
  safeBind("memberMgmtBtn", loadMemberManagement);
  safeBind("logoutBtn", logout);
});