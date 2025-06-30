export function loadDailyTasks(user) {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🎉 數位小兔 ${new Date().toISOString().split('T')[0]} 工作流程！</h2>
    <p>哈囉，${user.email}！</p>
    <p>🕤 9:30 阿寶交代</p>
  `;
}
