import { fileService } from '../../services/fileService.js';
import { createFileCard } from './fileCard.js';
import { showToast } from '../../utils/notifications.js';

export function initDashboardContent() {
    const content = document.getElementById('dashboard-content');
    if (!content) return;

    // Initial content
    loadFilesSection();

    // Listen for section changes
    window.addEventListener('dashboard-section-change', (e) => {
        switch (e.detail) {
            case 'files':
                loadFilesSection();
                break;
            case 'shared':
                loadSharedSection();
                break;
            case 'trash':
                loadTrashSection();
                break;
            case 'settings':
                loadSettingsSection();
                break;
        }
    });

    // Listen for file updates
    window.addEventListener('files-updated', () => {
        if (content.dataset.currentSection === 'files') {
            loadFilesSection();
        }
    });
}

function loadFilesSection() {
    const content = document.getElementById('dashboard-content');
    content.dataset.currentSection = 'files';
    
    const files = fileService.getFiles();
    const hasFiles = files.length > 0;

    content.innerHTML = `
        <div class="content-header d-flex justify-content-between align-items-center mb-4">
            <div>
                <h4 class="mb-1">Meus Arquivos</h4>
                <p class="text-secondary mb-0">${files.length} arquivo${files.length !== 1 ? 's' : ''}</p>
            </div>
            <div class="d-flex gap-2">
                <div class="btn-group">
                    <button class="btn btn-outline-secondary view-grid active">
                        <i class="bi bi-grid"></i>
                    </button>
                    <button class="btn btn-outline-secondary view-list">
                        <i class="bi bi-list"></i>
                    </button>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                    <i class="bi bi-cloud-upload me-2"></i>Upload
                </button>
            </div>
        </div>

        ${hasFiles ? `
            <div class="files-grid">
                ${files.map(file => createFileCard(file)).join('')}
            </div>
        ` : `
            <div class="text-center py-5">
                <div class="mb-4">
                    <i class="bi bi-cloud-upload text-secondary" style="font-size: 4rem;"></i>
                </div>
                <h5>Nenhum arquivo encontrado</h5>
                <p class="text-secondary mb-4">Faça upload do seu primeiro arquivo</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                    <i class="bi bi-cloud-upload me-2"></i>Upload
                </button>
            </div>
        `}
    `;

    // Initialize view toggles
    initializeViewToggles();
}

function loadSharedSection() {
    const content = document.getElementById('dashboard-content');
    content.dataset.currentSection = 'shared';
    
    content.innerHTML = `
        <div class="content-header mb-4">
            <h4>Arquivos Compartilhados</h4>
            <p class="text-secondary mb-0">Arquivos que outras pessoas compartilharam com você</p>
        </div>
        <div class="input-group mb-4" style="max-width: 400px;">
            <input type="text" class="form-control" placeholder="Digite o código do arquivo">
            <button class="btn btn-primary">Acessar Arquivo</button>
        </div>
        <div class="shared-files">
            <!-- Shared files will be loaded here -->
        </div>
    `;
}

function loadTrashSection() {
    const content = document.getElementById('dashboard-content');
    content.dataset.currentSection = 'trash';
    
    content.innerHTML = `
        <div class="content-header mb-4">
            <h4>Lixeira</h4>
            <p class="text-secondary mb-0">Arquivos excluídos nos últimos 30 dias</p>
        </div>
        <!-- Implement trash content -->
    `;
}

function loadSettingsSection() {
    const content = document.getElementById('dashboard-content');
    content.dataset.currentSection = 'settings';
    
    content.innerHTML = `
        <div class="content-header mb-4">
            <h4>Configurações</h4>
            <p class="text-secondary mb-0">Gerencie suas preferências e plano</p>
        </div>
        <!-- Implement settings content -->
    `;
}

function initializeViewToggles() {
    const gridBtn = document.querySelector('.view-grid');
    const listBtn = document.querySelector('.view-list');
    const filesGrid = document.querySelector('.files-grid');

    if (!gridBtn || !listBtn || !filesGrid) return;

    gridBtn.addEventListener('click', () => {
        filesGrid.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        filesGrid.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}