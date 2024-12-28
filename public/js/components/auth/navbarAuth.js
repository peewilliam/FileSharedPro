import { authService } from '../../services/auth/authService.js';

export function initNavbarAuth() {
    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) return;

    const updateNavbar = () => {
        if (authService.isAuthenticated()) {
            navbar.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link px-3" href="#recursos">Recursos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-3" href="#como-funciona">Como Funciona</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-3" href="#planos">Planos</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle me-1"></i>
                        ${authService.user.email}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/dashboard/"><i class="bi bi-grid me-2"></i>Dashboard</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
                    </ul>
                </li>
            `;

            document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
                e.preventDefault();
                authService.logout();
                window.location.reload();
            });
        } else {
            navbar.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link px-3" href="#recursos">Recursos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-3" href="#como-funciona">Como Funciona</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-3" href="#planos">Planos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-3" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Entrar</a>
                </li>
                <li class="nav-item ms-lg-3">
                    <a class="btn btn-primary rounded-pill px-4" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Criar Conta</a>
                </li>
            `;
        }
    };

    // Initial render
    updateNavbar();

    // Listen for auth changes
    window.addEventListener('auth-change', updateNavbar);
}