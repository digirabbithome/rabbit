
import { bindSidebarEvents } from './sidebar.js';

document.addEventListener("DOMContentLoaded", () => {
  // 初次進入主畫面就綁 sidebar 事件
  bindSidebarEvents();
});
