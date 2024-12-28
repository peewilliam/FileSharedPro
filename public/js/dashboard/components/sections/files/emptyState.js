export function renderEmptyState() {
    return `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="bi bi-cloud-upload"></i>
            </div>
            <h5>Nenhum arquivo encontrado</h5>
            <p class="text-secondary">Faça upload do seu primeiro arquivo</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                <i class="bi bi-cloud-upload me-2"></i>Upload
            </button>
        </div>`;
}