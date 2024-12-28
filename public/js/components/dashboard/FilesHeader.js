export function createFilesHeader(fileCount) {
    return `
        <div class="section-header d-flex justify-content-between align-items-center mb-4">
            <div>
                <h4 class="mb-1">Meus Arquivos</h4>
                <p class="text-secondary mb-0">${fileCount} arquivo${fileCount !== 1 ? 's' : ''}</p>
            </div>
            
            <div class="d-flex gap-3">
                <div class="input-group" style="width: 300px;">
                    <span class="input-group-text border-end-0 bg-light">
                        <i class="bi bi-search"></i>
                    </span>
                    <input type="text" 
                           class="form-control border-start-0 bg-light" 
                           id="searchFiles"
                           placeholder="Buscar arquivos...">
                </div>
                
                <div class="btn-group">
                    <button class="btn btn-outline-secondary view-grid active" title="Visualização em grade">
                        <i class="bi bi-grid"></i>
                    </button>
                    <button class="btn btn-outline-secondary view-list" title="Visualização em lista">
                        <i class="bi bi-list"></i>
                    </button>
                </div>
                
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                    <i class="bi bi-cloud-upload me-2"></i>
                    Upload
                </button>
            </div>
        </div>
    `;
}