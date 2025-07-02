
export function loadAddUserForm() {
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <h2>👤 新增帳號</h2>
    <form id="addUserForm">
      <input type="email" id="email" placeholder="Email" required /><br>
      <input type="text" id="name" placeholder="姓名" required /><br>
      <input type="date" id="birthday" placeholder="生日" required /><br>
      <input type="text" id="nickname" placeholder="綽號" required /><br>
      <select id="group" required>
        <option value="">請選擇群組</option>
        <option value="外場">外場</option>
        <option value="內場">內場</option>
        <option value="美編">美編</option>
        <option value="出貨">出貨</option>
      </select><br>
      <input type="password" id="password" placeholder="密碼" required /><br>
      <button type="submit">送出</button>
    </form>
  `;
}
