import { showToast } from './notifications.js';

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showToast('Copiado para a área de transferência!', 'success'))
        .catch(() => showToast('Erro ao copiar', 'error'));
}