
export function loadDailyTasks() {
  const content = document.getElementById("mainContent");
  content.innerHTML = "<h2>🗓️ 每日工作頁面</h2><p>這裡是每日工作內容。</p>";
}

export function loadAddUserForm() {
  const content = document.getElementById("mainContent");
  content.innerHTML = "<h2>👤 新增帳號頁面</h2><p>這裡是新增帳號的功能區。</p>";
}

export function loadMemberManagement() {
  const content = document.getElementById("mainContent");
  content.innerHTML = "<h2>👥 會員管理頁面</h2><p>這裡是會員管理清單。</p>";
}

export function logout() {
  window.location.href = "login.html";
}
