function safeImport(fnName, fallback) {
  try {
    return fnName;
  } catch {
    return fallback;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("mainContent");

  const warn = (msg) => () => {
    if (main) {
      main.innerHTML = `<h2>⚠️ 功能尚未啟用</h2><p>${msg}</p>`;
    }
  };

  const { loadDailyTasks = warn("每日工作功能載入失敗") } = await import('./dailyTasks.js').catch(() => ({}));
  const { loadAddUserForm = warn("新增帳號功能載入失敗") } = await import('./addUser.js').catch(() => ({}));
  const { loadMemberManagement = warn("會員管理功能載入失敗") } = await import('./memberManagement.js').catch(() => ({}));
  const { logout = warn("登出功能載入失敗") } = await import('./firebase.js').catch(() => ({}));

  const safeBind = (id, handler) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", handler);
    }
  };

  safeBind("dailyTasksBtn", loadDailyTasks);
  safeBind("addUserBtn", loadAddUserForm);
  safeBind("memberMgmtBtn", loadMemberManagement);
  safeBind("logoutBtn", logout);
});