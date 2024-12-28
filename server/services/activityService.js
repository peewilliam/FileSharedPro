export class ActivityService {
    async trackActivity(userId, action, fileId) {
        const activities = JSON.parse(global.localStorage?.getItem('activities') || '[]');
        
        const newActivity = {
            id: Date.now().toString(),
            userId,
            fileId,
            action,
            timestamp: new Date().toISOString()
        };

        activities.push(newActivity);
        global.localStorage?.setItem('activities', JSON.stringify(activities));
        
        return newActivity;
    }

    async getActivities(userId, limit = 10) {
        const activities = JSON.parse(global.localStorage?.getItem('activities') || '[]');
        return activities
            .filter(activity => activity.userId === userId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }
}

export const activityService = new ActivityService();