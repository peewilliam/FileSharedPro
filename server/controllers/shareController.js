import { shareService } from '../services/shareService.js';
import { activityService } from '../services/activityService.js';
import { ApiError } from '../utils/ApiError.js';

export const shareFile = async (req, res, next) => {
    try {
        const { fileId } = req.params;
        const { expirationDays } = req.body;

        const shareData = await shareService.shareFile(fileId, req.user.id, expirationDays);
        if (!shareData) {
            return next(new ApiError(404, 'File not found'));
        }

        await activityService.trackActivity(req.user.id, 'share', fileId);

        res.json({
            status: 'success',
            data: shareData
        });
    } catch (error) {
        next(new ApiError(500, 'Error sharing file'));
    }
};

export const getSharedFile = async (req, res, next) => {
    try {
        const { shareCode } = req.params;
        const file = await shareService.getSharedFile(shareCode);
        
        if (!file) {
            return next(new ApiError(404, 'Shared file not found or expired'));
        }

        res.json({
            status: 'success',
            data: file
        });
    } catch (error) {
        next(new ApiError(500, 'Error retrieving shared file'));
    }
};