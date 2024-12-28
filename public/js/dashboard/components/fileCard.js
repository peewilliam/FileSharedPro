export function createFileCard(file) {
    const expiresIn = new Date(file.expirationDate) - new Date();
    const daysLeft = Math.ceil(expiresIn / (1000 * 60 * 60 * 24));
    
    return `
        <div class="file-card">
            <div class="file-icon ${getFileIconClass(file.type)}">
                <i class="bi ${getFileIcon(file.type)}"></i>
            </div>
            <div class="file-info">
                <h6 class="file-name">${file.name}</h6>
                <div class="file-meta">
                    <span class="file-size">${formatFileSize(file.size)}</span>
                    <span class="file-code">Código: ${file.code}</span>
                </div>
                <div class="file-status">
                    <span class="expiration">Expira em ${daysLeft} dias</span>
                    <span class="downloads">${file.downloads}/${file.maxDownloads || '∞'} downloads</span>
                </div>
            </div>
            <div class="file-actions dropdown">
                <button class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#" onclick="copyFileCode('${file.code}')">
                        <i class="bi bi-clipboard"></i> Copiar Código
                    </a></li>
                    <li><a class="dropdown-item" href="#" onclick="shareFile('${file.code}')">
                        <i class="bi bi-share"></i> Compartilhar
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#" onclick="deleteFile('${file.id}')">
                        <i class="bi bi-trash"></i> Excluir
                    </a></li>
                </ul>
            </div>
        </div>
    `;
}

function getFileIconClass(type) {
    if (type.includes('image')) return 'image';
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('word')) return 'word';
    if (type.includes('excel')) return 'excel';
    return 'file';
}

function getFileIcon(type) {
    if (type.includes('image')) return 'bi-file-image';
    if (type.includes('pdf')) return 'bi-file-pdf';
    if (type.includes('word')) return 'bi-file-word';
    if (type.includes('excel')) return 'bi-file-excel';
    return 'bi-file-earmark';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}