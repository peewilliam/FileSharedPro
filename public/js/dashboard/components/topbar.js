import { auth } from '../../services/auth.js';

export function initTopbar() {
    const topbar = document.getElementById('topbar');
    if (!topbar) return;

    topbar.innerHTML = `
        <div class="container-fluid px-4">
            <div class="d-flex align-items-center justify-content-between h-100">
                <div class="d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text border-end-0 bg-light">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control border-start-0 bg-light" placeholder="Buscar arquivos...">
                    </div>
                </div>
                
                <div class="d-flex align-items-center">
                    <div class="dropdown">
                        <button class="btn btn-link text-dark text-decoration-none dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle me-2"></i>
                            <span>${auth.user?.email}</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Perfil</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Configurações</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Handle logout
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        auth.logout();
        window.location.href = '/';
    });
}