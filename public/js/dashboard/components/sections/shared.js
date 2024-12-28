import { fileService } from '../../../services/fileService.js';
import { createFileCard } from '../fileCard/fileCard.js';

export function renderSharedSection() {
    const sharedFiles = fileService.getSharedFiles();
    
    return `
        <div class="section-header">
            <h4>Arquivos Compartilhados</h4>
            <p class="text-secondary">Arquivos compartilhados com você</p>
        </div>

        <div class="shared-access mb-4">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Cole o código do arquivo aqui">
                <button class="btn btn-primary" id="accessFileBtn">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Acessar Arquivo
                </button>
            </div>
        </div>

        ${sharedFiles.length > 0 ? `
            <div class="files-grid">
                ${sharedFiles.map(file => createFileCard(file)).join('')}
            </div>
        ` : `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="bi bi-share"></i>
                </div>
                <h5>Nenhum arquivo compartilhado</h5>
                <p class="text-secondary">Cole o código de um arquivo compartilhado para acessá-lo</p>
            </div>
        `}
    `;
}