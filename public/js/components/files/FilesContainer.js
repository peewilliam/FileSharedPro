import { FileList } from './FileList.js';
import { filesService } from '../../services/filesService.js';
import { showToast } from '../../utils/notifications.js';

export class FilesContainer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.initialize();
    }

    async initialize() {
        try {
            const files = await filesService.getFiles();
            this.render(files);
        } catch (error) {
            showToast('Erro ao carregar arquivos', 'error');
        }
    }

    render(files) {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="section-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4>Meus Arquivos</h4>
                    <p class="text-secondary">${files.length} arquivo${files.length !== 1 ? 's' : ''}</p>
                </div>
                <div class="d-flex gap-2">
                    <div class="btn-group">
                        <button class="btn btn-outline-secondary view-grid active">
                            <i class="bi bi-grid"></i>
                        </button>
                        <button class="btn btn-outline-secondary view-list">
                            <i class="bi bi-list"></i>
                        </button>
                    </div>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                        <i class="bi bi-cloud-upload me-2"></i>Upload
                    </button>
                </div>
            </div>
        `;

        const fileList = new FileList({ files });
        this.container.appendChild(fileList);
        this.initializeViewToggles();
    }

    initializeViewToggles() {
        const gridBtn = this.container.querySelector('.view-grid');
        const listBtn = this.container.querySelector('.view-list');
        const filesGrid = this.container.querySelector('.files-grid');

        if (!gridBtn || !listBtn || !filesGrid) return;

        gridBtn.addEventListener('click', () => {
            filesGrid.classList.remove('list-view');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        });

        listBtn.addEventListener('click', () => {
            filesGrid.classList.add('list-view');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        });
    }
}