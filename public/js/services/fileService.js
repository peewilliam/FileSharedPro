import { generateCode } from '../utils/codeGenerator.js';
import { getFromStorage, setInStorage } from '../utils/storage.js';

class FileService {
    constructor() {
        this.initializeLocalStorage();
    }

    initializeLocalStorage() {
        if (!getFromStorage('files')) {
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
            setInStorage('files', sampleFiles);
        }
    }

    async getFiles() {
        return getFromStorage('files');
    }

    async uploadFile(file) {
        const files = await this.getFiles();
        const newFile = {
            id: Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            downloads: 0,
            code: generateCode(),
            createdAt: new Date().toISOString()
        };
        
        files.push(newFile);
        setInStorage('files', files);
        return newFile;
    }

    async deleteFile(id) {
        const files = await this.getFiles();
        const updatedFiles = files.filter(file => file.id !== id);
        setInStorage('files', updatedFiles);
    }
}

export const fileService = new FileService();