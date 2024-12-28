import { fileService } from '../../services/fileService.js';
import { showToast } from '../../utils/notifications.js';
import { formatFileSize } from '../../utils/fileUtils.js';

export function initUploadModal() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseFiles = document.getElementById('browseFiles');
    const progressBar = document.querySelector('.progress-bar');
    const progressArea = document.querySelector('.upload-progress');

    if (!dropZone || !fileInput || !browseFiles) return;

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
        const maxFileSize = 100 * 1024 * 1024; // 100MB for free plan
        
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
                const uploadedFile = await fileService.uploadFile(file);
                showToast(`Arquivo "${file.name}" enviado com sucesso!`, 'success');
            }
            
            // Reset and hide modal
            progressArea.classList.add('d-none');
            progressBar.style.width = '0%';
            fileInput.value = '';
            
            const modalElement = document.getElementById('uploadModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
            
            // Refresh files list
            window.dispatchEvent(new Event('files-updated'));
        } catch (error) {
            showToast('Erro ao fazer upload do arquivo', 'error');
            progressArea.classList.add('d-none');
        }
    }
}