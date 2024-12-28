import { authService } from '../../services/auth/authService.js';

export function initCtaSection() {
    const ctaSection = document.getElementById('cta-section');
    if (!ctaSection) return;

    const updateCtaVisibility = () => {
        if (authService.isAuthenticated()) {
            ctaSection.style.display = 'none';
        } else {
            ctaSection.style.display = 'block';
        }
    };

    // Initial check
    updateCtaVisibility();

    // Listen for auth changes
    window.addEventListener('auth-change', updateCtaVisibility);
}