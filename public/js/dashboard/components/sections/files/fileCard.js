import { getFileIconClass, getFileIcon } from '../../../../utils/fileUtils.js';
import { formatFileSize } from '../../../../utils/fileUtils.js';
import { formatTimeAgo } from '../../../../utils/dateUtils.js';

export function createFileCard(file) {
    return `
        <div class="file-card" data-file-id="${file.id}">
            <div class="file-icon ${getFileIconClass(file.type)}">
                <i class="bi ${getFileIcon(file.type)}"></i>
            </div>
            <div class="file-info">
                <h6 class="file-name">${file.name}</h6>
                <div class="file-meta">
                    <span class="file-size">${formatFileSize(file.size)}</span>
                    <span class="file-code">Código: ${file.code}</span>
                </div>
                <div class="file-status">
                    <span class="expiration">
                        <i class="bi bi-clock"></i>
                        ${formatTimeAgo(file.createdAt)}
                    </span>
                    <span class="downloads">
                        <i class="bi bi-download"></i>
                        ${file.downloads} downloads
                    </span>
                </div>
            </div>
            ${renderFileActions(file)}
        </div>`;
}

function renderFileActions(file) {
    return `
        <div class="file-actions dropdown">
            <button class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <button class="dropdown-item" onclick="copyFileCode('${file.code}')">
                        <i class="bi bi-clipboard"></i> Copiar Código
                    </button>
                </li>
                <li>
                    <button class="dropdown-item" onclick="shareFile('${file.code}')">
                        <i class="bi bi-share"></i> Compartilhar
                    </button>
                </li>
                <li>
                    <button class="dropdown-item" onclick="toggleFavorite('${file.id}')">
                        <i class="bi bi-star${file.favorite ? '-fill' : ''}"></i>
                        ${file.favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                    </button>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <button class="dropdown-item text-danger" onclick="deleteFile('${file.id}')">
                        <i class="bi bi-trash"></i> Excluir
                    </button>
                </li>
            </ul>
        </div>`;
}