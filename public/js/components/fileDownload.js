// Componente de download de arquivo
import { validateFileCode } from '../utils/validation.js';

export function initFileDownload() {
    const downloadForm = document.querySelector('.download-form');
    if (!downloadForm) return;

    const downloadInput = downloadForm.querySelector('.form-control');
    const downloadButton = downloadForm.querySelector('.btn-primary');

    const handleDownload = (e) => {
        e.preventDefault();
        const code = downloadInput?.value?.trim();
        
        if (validateFileCode(code)) {
            console.log('Iniciando download:', code);
            // Implementar lógica de download
        } else {
            showToast('Por favor, insira um código válido', 'error');
        }
    };

    downloadButton?.addEventListener('click', handleDownload);
}