import { initializeFirebase, login } from './firebase.js';

initializeFirebase();

window.loginClick = function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
};
