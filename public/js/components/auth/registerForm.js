import { authService } from '../../services/auth/authService.js';
import { showToast } from '../../utils/notifications.js';
import { validateEmail, validatePassword } from '../../utils/validation.js';

export function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;
        const name = email.split('@')[0]; // Simple name generation from email

        // Validation
        if (!validateEmail(email)) {
            showToast('Por favor, insira um email válido', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showToast('A senha deve ter pelo menos 8 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('As senhas não coincidem', 'error');
            return;
        }

        try {
            // Disable form while processing
            const submitButton = registerForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Criando conta...';

            await authService.register(email, password, name);
            showToast('Conta criada com sucesso!', 'success');
            
            // Close modal after successful registration
            const modalElement = document.getElementById('registerModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
            
            // Refresh the page to update the navigation
            window.location.reload();
        } catch (error) {
            showToast(error.message, 'error');
            // Re-enable form
            submitButton.disabled = false;
            submitButton.innerHTML = 'Criar Conta';
        }
    });
}