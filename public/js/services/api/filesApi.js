import { authService } from '../auth/authService.js';

class FilesApi {
    constructor() {
        this.baseURL = '/api';
    }

    async getFiles() {
        try {
            const response = await fetch(`${this.baseURL}/files`, {
                headers: {
                    ...authService.getAuthHeader()
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching files:', error);
            return [];
        }
    }

    async getFileById(id) {
        try {
            const response = await fetch(`${this.baseURL}/files/${id}`, {
                headers: {
                    ...authService.getAuthHeader()
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching file:', error);
            throw error;
        }
    }

    async createFile(fileData) {
        try {
            const response = await fetch(`${this.baseURL}/files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authService.getAuthHeader()
                },
                body: JSON.stringify(fileData)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error creating file:', error);
            throw error;
        }
    }

    async deleteFile(id) {
        try {
            const response = await fetch(`${this.baseURL}/files/${id}`, {
                method: 'DELETE',
                headers: {
                    ...authService.getAuthHeader()
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }
}

export const filesApi = new FilesApi();