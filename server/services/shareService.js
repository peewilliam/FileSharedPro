export class ShareService {
    async shareFile(fileId, userId, expirationDays = 7) {
        const files = JSON.parse(global.localStorage?.getItem('files') || '[]');
        const fileIndex = files.findIndex(f => f.id === fileId && f.userId === userId);
        
        if (fileIndex === -1) return null;

        const shareCode = this.generateShareCode();
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);

        files[fileIndex] = {
            ...files[fileIndex],
            shared: true,
            shareCode,
            shareExpiration: expirationDate.toISOString()
        };

        global.localStorage?.setItem('files', JSON.stringify(files));
        return { shareCode, expirationDate };
    }

    async getSharedFile(shareCode) {
        const files = JSON.parse(global.localStorage?.getItem('files') || '[]');
        const file = files.find(f => f.shareCode === shareCode);
        
        if (!file) return null;
        if (new Date(file.shareExpiration) < new Date()) return null;
        
        return file;
    }

    generateShareCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
}

export const shareService = new ShareService();