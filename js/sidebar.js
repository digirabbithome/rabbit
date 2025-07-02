import { loadAddUserForm } from './addUser.js';

window.addEventListener("DOMContentLoaded", () => {
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el && typeof fn === "function") {
      el.addEventListener("click", fn);
    }
  };

  bind("addUserBtn", loadAddUserForm);
});