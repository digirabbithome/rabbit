import { login } from './firebase.js';
window.loginWithForm = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
};