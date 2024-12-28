import express from 'express';
import filesRouter from './files.js';
import shareRouter from './share.js';
import authRouter from './auth.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/files', filesRouter);
router.use('/share', shareRouter);

export default router;