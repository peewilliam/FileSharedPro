import { getFileIconClass, getFileIcon } from '../../../../utils/fileUtils.js';
import { formatFileSize } from '../../../../utils/fileUtils.js';

export function renderPopularFiles(files) {
    return `
        <div class="content-card">
            <h5 class="card-title">Arquivos Populares</h5>
            <div class="popular-files">
                ${files.map(file => `
                    <div class="popular-file-item">
                        <div class="d-flex align-items-center mb-3">
                            <div class="file-icon ${getFileIconClass(file.name)}">
                                <i class="bi bi-${getFileIcon(file.name)}"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-1">${file.name}</h6>
                                <small class="text-secondary">${formatFileSize(file.size)}</small>
                            </div>
                        </div>
                        <div class="d-flex align-items-center text-secondary small">
                            <i class="bi bi-download me-2"></i>
                            ${file.downloads} downloads
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
}