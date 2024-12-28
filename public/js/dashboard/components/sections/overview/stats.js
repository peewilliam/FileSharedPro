import { formatFileSize } from '../../../../utils/fileUtils.js';

export function renderStats(stats) {
    return `
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-file-earmark"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.totalFiles}</h3>
                        <span>Arquivos</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-download"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.totalDownloads}</h3>
                        <span>Downloads</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-share"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${stats.sharedFiles}</h3>
                        <span>Compartilhados</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="bi bi-hdd"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${formatFileSize(stats.storageUsed)}</h3>
                        <span>de ${formatFileSize(stats.storageLimit)}</span>
                    </div>
                </div>
            </div>
        </div>`;
}