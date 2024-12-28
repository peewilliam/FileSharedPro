import { formatFileSize } from '../../../../utils/fileUtils.js';

export function renderStorage(storageUsed, storageLimit) {
    const usagePercentage = (storageUsed / storageLimit) * 100;
    
    return `
        <div class="card mb-4">
            <div class="card-body">
                <h6 class="mb-3">Uso do Armazenamento</h6>
                <div class="storage-progress mb-2">
                    <div class="progress">
                        <div class="progress-bar" style="width: ${usagePercentage}%"></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between text-secondary small">
                    <span>${formatFileSize(storageUsed)} usado</span>
                    <span>${formatFileSize(storageLimit - storageUsed)} disponível</span>
                </div>
            </div>
        </div>`;
}