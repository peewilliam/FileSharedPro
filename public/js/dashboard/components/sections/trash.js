import { fileService } from '../../../services/fileService.js';
import { createFileCard } from '../fileCard/fileCard.js';

export function renderTrashSection() {
    const trashedFiles = fileService.getTrashedFiles();
    
    return `
        <div class="section-header d-flex justify-content-between align-items-center">
            <div>
                <h4>Lixeira</h4>
                <p class="text-secondary">Arquivos excluídos nos últimos 30 dias</p>
            </div>
            ${trashedFiles.length > 0 ? `
                <button class="btn btn-danger" id="emptyTrashBtn">
                    <i class="bi bi-trash me-2"></i>Esvaziar Lixeira
                </button>
            ` : ''}
        </div>

        ${trashedFiles.length > 0 ? `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Os arquivos serão permanentemente excluídos após 30 dias
            </div>

            <div class="files-grid">
                ${trashedFiles.map(file => createFileCard({
                    ...file,
                    actions: ['restore', 'delete']
                })).join('')}
            </div>
        ` : `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="bi bi-trash"></i>
                </div>
                <h5>Lixeira Vazia</h5>
                <p class="text-secondary">Não há arquivos na lixeira</p>
            </div>
        `}
    `;
}