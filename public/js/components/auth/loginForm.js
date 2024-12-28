import { authService } from '../../services/auth/authService.js';
import { showToast } from '../../utils/notifications.js';
import { validateEmail } from '../../utils/validation.js';

export function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;

        if (!validateEmail(email)) {
            showToast('Por favor, insira um email válido', 'error');
            return;
        }

        try {
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Entrando...';

            await authService.login(email, password);
            showToast('Login realizado com sucesso!', 'success');
            
            // Close modal after successful login
            const modalElement = document.getElementById('loginModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
            
            // Refresh the page to update the navigation
            window.location.reload();
        } catch (error) {
            showToast(error.message, 'error');
            // Re-enable form
            submitButton.disabled = false;
            submitButton.innerHTML = 'Entrar';
        }
    });
}