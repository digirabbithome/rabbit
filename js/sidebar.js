
export function loadSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div style="padding: 1em; background: #f0f0f0; height: 100vh;">
      <h2>📋 工具列</h2>
      <ul>
        <li><a href="dashboard.html">每日工作</a></li>
        <li><a href="#" onclick="logout()">登出</a></li>
      </ul>
    </div>
  `;
  window.logout = () => {
    import('./firebase.js').then(mod => mod.logout());
  }
}
