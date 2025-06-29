
export function loadDailyTasks(user) {
  const content = document.getElementById("content");
  content.innerHTML = `
    🎉 數位小兔 ${new Date().toISOString().split('T')[0]} 工作流程！<br>
    哈囉，${user.email}！
  `;
}
