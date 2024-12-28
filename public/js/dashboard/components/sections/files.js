import { fileService } from '../../../services/fileService.js';
import { createFileCard } from '../../components/fileCard.js';

export function renderFilesSection() {
    const files = fileService.getFiles();
    const hasFiles = files.length > 0;

    return `
        <div class="section-header d-flex justify-content-between align-items-center">
            <div>
                <h4>Meus Arquivos</h4>
                <p class="text-secondary">${files.length} arquivo${files.length !== 1 ? 's' : ''}</p>
            </div>
            <div class="d-flex gap-2">
                <div class="btn-group view-toggle">
                    <button class="btn btn-outline-secondary active" data-view="grid">
                        <i class="bi bi-grid"></i>
                    </button>
                    <button class="btn btn-outline-secondary" data-view="list">
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
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="bi bi-cloud-upload"></i>
                </div>
                <h5>Nenhum arquivo encontrado</h5>
                <p class="text-secondary">Faça upload do seu primeiro arquivo</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                    <i class="bi bi-cloud-upload me-2"></i>Upload
                </button>
            </div>
        `}
    `;
}