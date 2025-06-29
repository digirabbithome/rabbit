
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("logButton");
  const logArea = document.getElementById("logArea");

  let logged = false;
  const username = "小兔"; // 模擬使用者名稱

  btn.addEventListener("click", function() {
    if (logged) return;

    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const time = `${hh}:${mm}`;

    logArea.textContent = `👤 ${username} 已於 ${time} 完成 ✅`;
    btn.disabled = true;
    logged = true;
  });
});
