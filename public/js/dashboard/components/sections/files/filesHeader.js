export function renderFilesHeader(fileCount) {
    return `
        <div class="section-header d-flex justify-content-between align-items-center">
            <div>
                <h4>Meus Arquivos</h4>
                <p class="text-secondary">${fileCount} arquivo${fileCount !== 1 ? 's' : ''}</p>
            </div>
            <div class="d-flex gap-2">
                <div class="btn-group view-toggle">
                    <button class="btn btn-outline-secondary active" data-view="grid">
                        <i class="bi bi-grid"></i>
                    </button>
                    <button class="btn btn-outline-secondary" data-view="list">
                        <i class="bi bi-list"></i>
                    </button>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                    <i class="bi bi-cloud-upload me-2"></i>Upload
                </button>
            </div>
        </div>`;
}