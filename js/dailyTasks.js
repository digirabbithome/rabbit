
export function loadDailyTasks() {
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <h2>📝 每日工作</h2>
    <button class="task-button">✅ 拍攝商品照</button>
    <button class="task-button">✅ 上架新品</button>
    <button class="task-button">✅ 回覆顧客訊息</button>
    <div id="taskStatus"></div>
  `;
}
