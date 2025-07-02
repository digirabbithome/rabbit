
import { loadDailyTasks } from './dailyTasks.js';
import { loadAddUserForm } from './addUser.js';
import { loadMemberManagement } from './memberManagement.js';
import { logout } from './firebase.js';

document.getElementById("btnDaily").addEventListener("click", loadDailyTasks);
document.getElementById("btnAddUser").addEventListener("click", loadAddUserForm);
document.getElementById("btnManage").addEventListener("click", loadMemberManagement);
document.getElementById("btnLogout").addEventListener("click", logout);
