import express from 'express';
import { sampleData } from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ data: sampleData.files });
});

router.post('/', (req, res) => {
  const newFile = {
    id: Date.now().toString(),
    ...req.body,
    downloads: 0,
    code: Math.random().toString(36).substring(2, 8).toUpperCase(),
    createdAt: new Date().toISOString()
  };
  sampleData.files.push(newFile);
  res.status(201).json({ data: newFile });
});

router.delete('/:id', (req, res) => {
  const index = sampleData.files.findIndex(file => file.id === req.params.id);
  if (index !== -1) {
    sampleData.files.splice(index, 1);
  }
  res.status(204).send();
});

export default router;