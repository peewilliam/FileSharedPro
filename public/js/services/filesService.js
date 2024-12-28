class FilesService {
    constructor() {
        // Initialize sample data if not exists
        if (!localStorage.getItem('files')) {
            this.initializeSampleData();
        }
    }

    initializeSampleData() {
        const sampleFiles = [
            {
                id: '1',
                name: 'Relatório Mensal.pdf',
                size: 3.2 * 1024 * 1024,
                type: 'application/pdf',
                downloads: 28,
                code: 'ABC123',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: '2',
                name: 'Imagens Projeto.zip',
                size: 15.7 * 1024 * 1024,
                type: 'application/zip',
                downloads: 12,
                code: 'XYZ789',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        localStorage.setItem('files', JSON.stringify(sampleFiles));
    }

    async getFiles() {
        const files = JSON.parse(localStorage.getItem('files') || '[]');
        return files;
    }

    async uploadFile(file) {
        const files = JSON.parse(localStorage.getItem('files') || '[]');
        const newFile = {
            id: Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            downloads: 0,
            code: this.generateFileCode(),
            createdAt: new Date().toISOString()
        };
        
        files.push(newFile);
        localStorage.setItem('files', JSON.stringify(files));
        return newFile;
    }

    generateFileCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    async deleteFile(id) {
        const files = JSON.parse(localStorage.getItem('files') || '[]');
        const updatedFiles = files.filter(file => file.id !== id);
        localStorage.setItem('files', JSON.stringify(updatedFiles));
    }

        // Copiar o código do arquivo para o clipboard
    copyCode(code) {
        navigator.clipboard.writeText(code).then(() => {
            alert('Código copiado!');
        }).catch(() => {
            alert('Falha ao copiar código.');
        });
    }

}

export const filesService = new FilesService();