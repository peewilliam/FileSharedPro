import { filesApi } from './api/filesApi.js';

export class StatsService {
    constructor() {
        this.api = filesApi;
        this.subscribers = new Set();
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback());
    }

    async getStats() {
        try {
            const files = await this.api.getFiles();
            
            return {
                totalFiles: files.length,
                totalDownloads: files.reduce((sum, file) => sum + file.downloads, 0),
                sharedFiles: files.filter(file => file.shared).length,
                storageUsed: files.reduce((sum, file) => sum + file.size, 0),
                storageLimit: 1024 * 1024 * 1024, // 1GB for demo
                recentUploads: files.filter(file => {
                    const uploadTime = new Date(file.createdAt).getTime();
                    const daysSinceUpload = (Date.now() - uploadTime) / (1000 * 60 * 60 * 24);
                    return daysSinceUpload <= 7;
                }).length
            };
        } catch (error) {
            console.error('Error fetching stats:', error);
            return {
                totalFiles: 0,
                totalDownloads: 0,
                sharedFiles: 0,
                storageUsed: 0,
                storageLimit: 1024 * 1024 * 1024,
                recentUploads: 0
            };
        }
    }

    async getRecentActivity() {
        try {
            const files = await this.api.getFiles();
            return files
                .filter(file => file.lastAction)
                .map(file => ({
                    type: file.lastAction.type,
                    file: file.name,
                    time: this.formatTimeAgo(file.lastAction.date),
                    date: new Date(file.lastAction.date)
                }))
                .sort((a, b) => b.date - a.date)
                .slice(0, 5);
        } catch (error) {
            console.error('Error fetching activities:', error);
            return [];
        }
    }

    async getPopularFiles() {
        try {
            const files = await this.api.getFiles();
            return files
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, 3)
                .map(file => ({
                    name: file.name,
                    downloads: file.downloads,
                    size: file.size,
                    type: file.type
                }));
        } catch (error) {
            console.error('Error fetching popular files:', error);
            return [];
        }
    }

    formatTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' anos atrás';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' meses atrás';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' dias atrás';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' horas atrás';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutos atrás';
        
        return 'Agora mesmo';
    }
}

export const statsService = new StatsService();