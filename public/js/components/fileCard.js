import { getFileIconClass, getFileIcon, formatFileSize } from '../utils/fileUtils.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { fileService } from '../services/fileService.js';
import { showToast } from '../utils/notifications.js';

export function createFileCard(file) {
    const expiresIn = new Date(file.expirationDate) - new Date();
    const daysLeft = Math.ceil(expiresIn / (1000 * 60 * 60 * 24));
    
    const copyFileCode = (code) => {
        copyToClipboard(code);
    };

    const shareFile = (code) => {
        const shareUrl = `${window.location.origin}/share/${code}`;
        copyToClipboard(shareUrl);
    };

    const deleteFile = async (id) => {
        try {
            await fileService.deleteFile(id);
            showToast('Arquivo excluído com sucesso', 'success');
            window.dispatchEvent(new Event('files-updated'));
        } catch (error) {
            showToast('Erro ao excluir arquivo', 'error');
        }
    };
    
    return `
        <div class="file-card">
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
                    <span class="expiration">Expira em ${daysLeft} dias</span>
                    <span class="downloads">${file.downloads}/${file.maxDownloads || '∞'} downloads</span>
                </div>
            </div>
            <div class="file-actions dropdown">
                <button class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><button class="dropdown-item" onclick="copyFileCode('${file.code}')">
                        <i class="bi bi-clipboard"></i> Copiar Código
                    </button></li>
                    <li><button class="dropdown-item" onclick="shareFile('${file.code}')">
                        <i class="bi bi-share"></i> Compartilhar
                    </button></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item text-danger" onclick="deleteFile('${file.id}')">
                        <i class="bi bi-trash"></i> Excluir
                    </button></li>
                </ul>
            </div>
        </div>
    `;
}