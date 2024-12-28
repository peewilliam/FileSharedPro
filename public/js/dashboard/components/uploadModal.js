import { fileService } from '../../services/fileService.js';
import { showToast } from '../../utils/notifications.js';
import { getUserPlan } from '../../services/userService.js';

export function initUploadModal() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseFiles = document.getElementById('browseFiles');
    const progressBar = document.querySelector('.progress-bar');
    const progressArea = document.querySelector('.upload-progress');

    if (!dropZone || !fileInput || !browseFiles) return;

    const userPlan = getUserPlan();
    const maxFileSize = getMaxFileSize(userPlan);
    updateUploadInfo(userPlan, maxFileSize);

    // Handle file browsing
    browseFiles.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', handleFiles);

    // Handle drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles({ target: { files } });
    });

    async function handleFiles(e) {
        const files = Array.from(e.target.files);
        
        // Validate file size
        const invalidFiles = files.filter(file => file.size > maxFileSize);
        if (invalidFiles.length > 0) {
            showToast(`Alguns arquivos excedem o limite de ${formatFileSize(maxFileSize)}`, 'error');
            return;
        }

        // Show progress
        progressArea.classList.remove('d-none');
        
        try {
            for (const file of files) {
                const uploadedFile = await fileService.uploadFile(file, userPlan);
                showToast(`Arquivo "${file.name}" enviado com sucesso! Código: ${uploadedFile.code}`, 'success');
            }
        } catch (error) {
            showToast('Erro ao fazer upload do arquivo', 'error');
        } finally {
            // Reset and hide modal
            progressArea.classList.add('d-none');
            progressBar.style.width = '0%';
            const modal = bootstrap.Modal.getInstance(document.getElementById('uploadModal'));
            modal.hide();
            
            // Refresh files list
            window.dispatchEvent(new CustomEvent('dashboard-section-change', { detail: 'files' }));
        }
    }
}

function getMaxFileSize(plan) {
    switch(plan) {
        case 'free': return 100 * 1024 * 1024; // 100MB
        case 'pro': return 5 * 1024 * 1024 * 1024; // 5GB
        case 'business': return 100 * 1024 * 1024 * 1024; // 100GB
        default: return 100 * 1024 * 1024; // 100MB
    }
}

function updateUploadInfo(plan, maxSize) {
    const uploadInfo = document.querySelector('.upload-info');
    if (uploadInfo) {
        uploadInfo.textContent = `${plan === 'free' ? 'Plano Gratuito: ' : ''}Arquivos até ${formatFileSize(maxSize)}`;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}