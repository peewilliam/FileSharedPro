// Service to handle user-related operations
export class UserService {
    constructor() {
        this.user = null;
        this.loadUser();
    }

    loadUser() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
        }
    }

    getUserPlan() {
        return this.user?.plan || 'free';
    }

    getStorageUsage() {
        const files = JSON.parse(localStorage.getItem('files') || '[]');
        return files.reduce((total, file) => total + file.size, 0);
    }

    getStorageLimit() {
        const plan = this.getUserPlan();
        switch(plan) {
            case 'free': return 1 * 1024 * 1024 * 1024; // 1GB
            case 'pro': return 100 * 1024 * 1024 * 1024; // 100GB
            case 'business': return 1024 * 1024 * 1024 * 1024; // 1TB
            default: return 1 * 1024 * 1024 * 1024; // 1GB
        }
    }
}

export const userService = new UserService();