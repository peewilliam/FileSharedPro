import express from 'express';
import { shareFile, getSharedFile } from '../controllers/shareController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/:fileId/share', authMiddleware, shareFile);
router.get('/:shareCode', getSharedFile);

export default router;