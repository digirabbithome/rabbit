
export function loadAddUserForm() {
  const content = document.getElementById("mainContent");
  content.innerHTML = `
    <h2>👤 新增帳號</h2>
    <form id="addUserForm">
      <label>Email：<input type="email" id="email" required></label><br>
      <label>姓名：<input type="text" id="name" required></label><br>
      <label>生日：<input type="date" id="birthday" required></label><br>
      <label>綽號：<input type="text" id="nickname" required></label><br>
      <label>密碼：<input type="password" id="password" required></label><br>
      <label>群組：
        <select id="group">
          <option value="外場">外場</option>
          <option value="內場">內場</option>
          <option value="美編">美編</option>
          <option value="出貨">出貨</option>
        </select>
      </label><br>
      <button type="submit">送出</button>
    </form>
  `;
}
