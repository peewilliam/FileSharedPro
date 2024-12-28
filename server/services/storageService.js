export class StorageService {
    constructor() {
        this.STORAGE_LIMITS = {
            free: 1024 * 1024 * 100, // 100MB
            pro: 1024 * 1024 * 1024 * 5, // 5GB
            business: 1024 * 1024 * 1024 * 100 // 100GB
        };
    }

    async calculateStorageUsage(userId) {
        const files = JSON.parse(global.localStorage?.getItem('files') || '[]');
        return files
            .filter(file => file.userId === userId)
            .reduce((total, file) => total + file.size, 0);
    }

    async checkStorageLimit(userId, fileSize) {
        const userPlan = await this.getUserPlan(userId);
        const currentUsage = await this.calculateStorageUsage(userId);
        const limit = this.STORAGE_LIMITS[userPlan];

        return (currentUsage + fileSize) <= limit;
    }

    async getUserPlan(userId) {
        // Mock implementation - replace with actual user plan lookup
        return 'free';
    }
}

export const storageService = new StorageService();