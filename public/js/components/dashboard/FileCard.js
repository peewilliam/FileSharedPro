import { formatFileSize } from '../../utils/fileUtils.js';
import { formatTimeAgo } from '../../utils/dateUtils.js';

export function createFileCard(file) {
    return `
        <div class="file-card" data-file-id="${file.id}">
            <div class="file-icon ${getFileIconClass(file.type)}">
                <i class="bi ${getFileIcon(file.type)}"></i>
            </div>
            
            <div class="file-info">
                <h6 class="file-name" title="${file.name}">${file.name}</h6>
                
                <div class="file-meta">
                    <span>
                        <i class="bi bi-hdd"></i>
                        ${formatFileSize(file.size)}
                    </span>
                    <span>
                        <i class="bi bi-key"></i>
                        ${file.code}
                    </span>
                </div>
                
                <div class="file-status">
                    <span class="text-secondary">
                        <i class="bi bi-clock"></i>
                        ${formatTimeAgo(file.createdAt)}
                    </span>
                    <span class="text-secondary">
                        <i class="bi bi-download"></i>
                        ${file.downloads} downloads
                    </span>
                </div>
            </div>
            
            <div class="file-actions dropdown">
                <button class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <button class="dropdown-item" onclick="copyFileCode('${file.code}')">
                            <i class="bi bi-clipboard me-2"></i>
                            Copiar Código
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item" onclick="shareFile('${file.code}')">
                            <i class="bi bi-share me-2"></i>
                            Compartilhar
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item" onclick="downloadFile('${file.id}')">
                            <i class="bi bi-download me-2"></i>
                            Download
                        </button>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                        <button class="dropdown-item text-danger" onclick="deleteFile('${file.id}')">
                            <i class="bi bi-trash me-2"></i>
                            Excluir
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

function getFileIconClass(type) {
    if (type.includes('image')) return 'image';
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('word')) return 'word';
    if (type.includes('excel')) return 'excel';
    if (type.includes('video')) return 'video';
    if (type.includes('audio')) return 'audio';
    if (type.includes('zip') || type.includes('rar')) return 'archive';
    return 'file';
}

function getFileIcon(type) {
    if (type.includes('image')) return 'bi-file-image';
    if (type.includes('pdf')) return 'bi-file-pdf';
    if (type.includes('word')) return 'bi-file-word';
    if (type.includes('excel')) return 'bi-file-excel';
    if (type.includes('video')) return 'bi-file-play';
    if (type.includes('audio')) return 'bi-file-music';
    if (type.includes('zip') || type.includes('rar')) return 'bi-file-zip';
    return 'bi-file-earmark';
}