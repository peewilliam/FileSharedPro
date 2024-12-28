import express from 'express';
import { getFiles, uploadFile, deleteFile, getFileByCode } from '../controllers/fileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getFiles);
router.post('/', uploadFile);
router.delete('/:id', deleteFile);
router.get('/code/:code', getFileByCode);

export default router;