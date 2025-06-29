// js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  // 模擬綽號（實際上這應該從 Firebase 讀取）
  const nickname = localStorage.getItem("nickname") || "小兔";

  // 左側選單
  document.getElementById("sidebar").innerHTML = `
    <div style="padding: 1rem; background-color: #f0f0f0; height: 100vh;">
      <h3>📋 工具列</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li><a href="#" id="workBtn">每日工作</a></li>
        <li><a href="#" id="logoutBtn">登出</a></li>
      </ul>
    </div>
  `;

  // 右側內容
  document.getElementById("content").innerHTML = `
    <div style="padding: 1rem;">
      <h2>🎉 數位小兔 今日工作</h2>
      <p>哈囉，${nickname}！這是你的工作主頁</p>
    </div>
  `;

  // 登出機制
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("nickname");
    window.location.href = "/";
  });

  // 其他功能可後續補上
});
