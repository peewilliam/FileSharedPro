import { initLoginForm } from './loginForm.js';
import { initRegisterForm } from './registerForm.js';

export function initAuthModals() {
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            const loginModalInstance = bootstrap.Modal.getInstance(loginModal);
            loginModalInstance.hide();
            const registerModalInstance = new bootstrap.Modal(registerModal);
            registerModalInstance.show();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            const registerModalInstance = bootstrap.Modal.getInstance(registerModal);
            registerModalInstance.hide();
            const loginModalInstance = new bootstrap.Modal(loginModal);
            loginModalInstance.show();
        });
    }

    // Initialize forms
    initLoginForm();
    initRegisterForm();
}