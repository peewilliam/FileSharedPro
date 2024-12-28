import { fileService } from '../../../services/fileService.js';
import { createFileCard } from '../fileCard/fileCard.js';

export function renderFavoritesSection() {
    const favoriteFiles = fileService.getFavoriteFiles();
    
    return `
        <div class="section-header">
            <h4>Arquivos Favoritos</h4>
            <p class="text-secondary">Seus arquivos marcados como favoritos</p>
        </div>

        ${favoriteFiles.length > 0 ? `
            <div class="files-grid">
                ${favoriteFiles.map(file => createFileCard(file)).join('')}
            </div>
        ` : `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="bi bi-star"></i>
                </div>
                <h5>Nenhum arquivo favorito</h5>
                <p class="text-secondary">Marque arquivos como favoritos para acesso rápido</p>
            </div>
        `}
    `;
}