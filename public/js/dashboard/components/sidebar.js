import { authService } from '../../services/auth/authService.js';

export function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const user = authService.user;
    const userInitials = user?.name?.substring(0, 2).toUpperCase() || 'US';

    sidebar.innerHTML = `
        <div class="sidebar-brand">
            <i class="bi bi-share-fill"></i>
            <span>FileShare Pro</span>
        </div>

        <div class="sidebar-menu">
            <div class="menu-header">Menu</div>
            <ul class="menu-items">
                <li class="active">
                    <a href="#" data-section="files">
                        <i class="bi bi-folder"></i>
                        <span>Meus Arquivos</span>
                    </a>
                </li>
                <li>
                    <a href="#" data-section="shared">
                        <i class="bi bi-share"></i>
                        <span>Compartilhados</span>
                    </a>
                </li>
                <li>
                    <a href="#" data-section="trash">
                        <i class="bi bi-trash"></i>
                        <span>Lixeira</span>
                    </a>
                </li>
            </ul>

            <div class="menu-header">Plano</div>
            <div class="storage-widget">
                <div class="storage-info">
                    <div class="storage-text">
                        <span>Armazenamento</span>
                        <span>2.4 GB / 5 GB</span>
                    </div>
                    <div class="storage-progress">
                        <div class="progress-bar" style="width: 48%"></div>
                    </div>
                </div>
                <a href="#" class="btn btn-outline-primary btn-sm w-100 mt-2">
                    Upgrade para Pro
                </a>
            </div>
        </div>

        <div class="sidebar-footer">
            <div class="dropdown">
                <button class="user-menu" type="button" data-bs-toggle="dropdown">
                    <div class="user-avatar">${userInitials}</div>
                    <div class="user-info">
                        <span class="user-name">${user?.name || 'Usuário'}</span>
                        <span class="user-email">${user?.email || ''}</span>
                    </div>
                    <i class="bi bi-chevron-down"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-person"></i> Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-gear"></i> Configurações</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">
                        <i class="bi bi-box-arrow-right"></i> Sair
                    </a></li>
                </ul>
            </div>
        </div>
    `;

    // Handle navigation
    sidebar.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.currentTarget.dataset.section;
            
            // Update active state
            sidebar.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Dispatch event to update content
            window.dispatchEvent(new CustomEvent('dashboard-section-change', { detail: section }));
        });
    });

    // Handle logout
    const logoutBtn = sidebar.querySelector('#logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authService.logout();
        });
    }
}