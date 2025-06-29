// dashboard.js

import { initializeFirebase, checkAuth } from './firebase.js';
import { loadSidebar } from './sidebar.js';
import { loadDailyTasks } from './dailyTasks.js';

initializeFirebase();
checkAuth().then(user => {
  loadSidebar();
  loadDailyTasks(user);
});
