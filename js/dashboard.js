document.addEventListener("DOMContentLoaded", () => {
  const nickname = localStorage.getItem("nickname") || "小兔";

  // 左側工具列
  document.getElementById("sidebar").innerHTML = `
    <h3>📋 工具列</h3>
    <a href="#" id="workBtn">每日工作</a>
    <a href="#" id="logoutBtn">登出</a>
  `;

  // 點「每日工作」時載入內容
  const renderWork = () => {
    document.getElementById("content").innerHTML = `
      <h2>🎉 數位小兔 今日工作</h2>
      <p>哈囉，${nickname}！這是你的工作主頁</p>
      <ul>
        <li>🕤 9:30 阿寶交代</li>
        <li>🕤 9:30 QA</li>
        <li>🕤 11:30 QA</li>
      </ul>
    `;
  };

  // 預設顯示工作頁
  renderWork();

  document.getElementById("workBtn").addEventListener("click", (e) => {
    e.preventDefault();
    renderWork();
  });

  // 登出
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("nickname");
    window.location.href = "/";
  });
});
