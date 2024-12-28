import { createFileCard } from './FileCard.js';

export function FileList({ files }) {
    const container = document.createElement('div');
    container.className = 'files-grid';
    
    if (files.length === 0) {
        container.innerHTML = `
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
        `;
        return container;
    }

    container.innerHTML = files.map(file => createFileCard(file)).join('');
    return container;
}