import { createFileCard } from './FileCard.js';

export class FilesGrid {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.viewMode = localStorage.getItem('filesViewMode') || 'grid';
        this.initialize();
    }

    initialize() {
        if (!this.container) return;
        
        // Add view mode class
        this.container.classList.add('files-grid');
        if (this.viewMode === 'list') {
            this.container.classList.add('list-view');
        }
    }

    render(files) {
        if (!this.container) return;

        if (!files.length) {
            this.renderEmptyState();
            return;
        }

        this.container.innerHTML = files.map(file => createFileCard(file)).join('');
    }

    renderEmptyState() {
        this.container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="bi bi-cloud-upload"></i>
                </div>
                <h5>Nenhum arquivo encontrado</h5>
                <p class="text-secondary mb-4">Faça upload do seu primeiro arquivo</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                    <i class="bi bi-cloud-upload me-2"></i>
                    Upload
                </button>
            </div>
        `;
    }

    setViewMode(mode) {
        this.viewMode = mode;
        localStorage.setItem('filesViewMode', mode);
        
        if (mode === 'list') {
            this.container.classList.add('list-view');
        } else {
            this.container.classList.remove('list-view');
        }
    }
}