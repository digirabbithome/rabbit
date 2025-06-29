
import { initializeFirebase, checkAuth } from './firebase.js';
import { loadSidebar } from './sidebar.js';
import { loadDailyTasks } from './dailyTasks.js';

console.log("✅ dashboard.js 進入執行");

initializeFirebase();
checkAuth().then(user => {
  loadSidebar();
  loadDailyTasks(user);
});
