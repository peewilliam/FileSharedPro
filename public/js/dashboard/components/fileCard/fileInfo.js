import { formatFileSize } from '../../../utils/fileUtils.js';

export function FileInfo({ file }) {
    const expiresIn = new Date(file.expirationDate) - new Date();
    const daysLeft = Math.ceil(expiresIn / (1000 * 60 * 60 * 24));
    
    return `
        <div class="file-info">
            <h6 class="file-name">${file.name}</h6>
            <div class="file-meta">
                <span class="file-size">${formatFileSize(file.size)}</span>
                <span class="file-code">Código: ${file.code}</span>
            </div>
            <div class="file-status">
                <span class="expiration ${daysLeft <= 2 ? 'text-danger' : ''}">
                    <i class="bi bi-clock"></i>
                    Expira em ${daysLeft} dias
                </span>
                <span class="downloads">
                    <i class="bi bi-download"></i>
                    ${file.downloads}/${file.maxDownloads || '∞'} downloads
                </span>
            </div>
        </div>
    `;
}