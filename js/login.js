
import { initializeFirebase, login } from './firebase.js';

initializeFirebase();
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
