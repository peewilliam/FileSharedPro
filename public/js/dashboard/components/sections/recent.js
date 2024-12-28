import { fileService } from '../../../services/fileService.js';
import { createFileCard } from '../fileCard/fileCard.js';

export function renderRecentSection() {
    const recentFiles = fileService.getRecentFiles();
    
    return `
        <div class="section-header">
            <h4>Arquivos Recentes</h4>
            <p class="text-secondary">Seus arquivos mais recentes</p>
        </div>

        <div class="activity-timeline mb-4">
            ${recentFiles.map(file => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="bi bi-${getActivityIcon(file.action)}"></i>
                    </div>
                    <div class="activity-content">
                        <p class="mb-1">
                            <strong>${getActivityText(file)}</strong>
                        </p>
                        <small class="text-secondary">${formatTimeAgo(file.date)}</small>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="files-grid">
            ${recentFiles.map(file => createFileCard(file)).join('')}
        </div>
    `;
}

function getActivityIcon(action) {
    switch(action) {
        case 'upload': return 'cloud-upload';
        case 'download': return 'download';
        case 'share': return 'share';
        case 'delete': return 'trash';
        default: return 'circle';
    }
}

function getActivityText(file) {
    switch(file.action) {
        case 'upload': return `Você fez upload de ${file.name}`;
        case 'download': return `${file.name} foi baixado`;
        case 'share': return `Você compartilhou ${file.name}`;
        case 'delete': return `Você excluiu ${file.name}`;
        default: return `Ação em ${file.name}`;
    }
}

function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    return 'Agora mesmo';
}