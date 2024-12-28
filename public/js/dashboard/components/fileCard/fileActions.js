import { copyToClipboard } from '../../../utils/clipboard.js';
import { fileService } from '../../../services/fileService.js';
import { showToast } from '../../../utils/notifications.js';

export function FileActions({ file }) {
    const handleAction = async (action) => {
        switch (action) {
            case 'copy':
                copyToClipboard(file.code);
                showToast('Código copiado!', 'success');
                break;
            case 'share':
                const shareUrl = `${window.location.origin}/share/${file.code}`;
                copyToClipboard(shareUrl);
                showToast('Link de compartilhamento copiado!', 'success');
                break;
            case 'delete':
                if (confirm('Tem certeza que deseja excluir este arquivo?')) {
                    await fileService.deleteFile(file.id);
                    showToast('Arquivo excluído com sucesso', 'success');
                    window.dispatchEvent(new Event('files-updated'));
                }
                break;
        }
    };

    return `
        <div class="file-actions dropdown">
            <button class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <button class="dropdown-item" onclick="handleAction('copy')">
                        <i class="bi bi-clipboard"></i> Copiar Código
                    </button>
                </li>
                <li>
                    <button class="dropdown-item" onclick="handleAction('share')">
                        <i class="bi bi-share"></i> Compartilhar
                    </button>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <button class="dropdown-item text-danger" onclick="handleAction('delete')">
                        <i class="bi bi-trash"></i> Excluir
                    </button>
                </li>
            </ul>
        </div>
    `;
}