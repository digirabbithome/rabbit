import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadUserManager } from './userManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const dailyTaskBtn = document.getElementById('menu-daily');
  const addUserBtn = document.getElementById('menu-adduser');
  const userManagerBtn = document.getElementById('menu-users');

  if (dailyTaskBtn) {
    dailyTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadDailyTasks();
    });
  }

  if (addUserBtn) {
    addUserBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadAddUserForm();
    });
  }

  if (userManagerBtn) {
    userManagerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadUserManager();
    });
  }
});