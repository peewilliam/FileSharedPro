import { statsService } from './statsService.js';

export class ActivityTracker {
    static async trackFileUpload(file) {
        await statsService.addActivity('upload', file.name);
    }

    static async trackFileDownload(file) {
        await statsService.addActivity('download', file.name);
    }

    static async trackFileShare(file) {
        await statsService.addActivity('share', file.name);
    }

    static async trackFileFavorite(file) {
        await statsService.addActivity('favorite', file.name);
    }

    static async trackFileDelete(file) {
        await statsService.addActivity('delete', file.name);
    }
}

export const activityTracker = new ActivityTracker();