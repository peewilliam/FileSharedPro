import { renderFilesList } from './filesList.js';
import { renderFilesHeader } from './filesHeader.js';
import { renderEmptyState } from './emptyState.js';
import { fileService } from '../../../../services/fileService.js';

export async function renderFilesSection() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Show loading state
    mainContent.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>
    `;

    try {
        const files = await fileService.getFiles();
        const hasFiles = files.length > 0;

        mainContent.innerHTML = `
            ${renderFilesHeader(files.length)}
            ${hasFiles ? renderFilesList(files) : renderEmptyState()}
        `;

        // Initialize view toggles if there are files
        if (hasFiles) {
            initializeViewToggles();
        }
    } catch (error) {
        mainContent.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Erro ao carregar arquivos. Por favor, tente novamente.
            </div>
        `;
    }
}

function initializeViewToggles() {
    const viewBtns = document.querySelectorAll('.view-toggle .btn');
    const filesGrid = document.querySelector('.files-grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (btn.dataset.view === 'list') {
                filesGrid?.classList.add('list-view');
            } else {
                filesGrid?.classList.remove('list-view');
            }
        });
    });
}