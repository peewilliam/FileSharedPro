import fileService from '../services/fileService.js';

export const getFiles = async (req, res) => {
  try {
    const files = await fileService.getFiles(req.user.id);
    res.json({ data: files });
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error fetching files' 
    });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const file = await fileService.uploadFile(req.body, req.user.id);
    res.status(201).json({ data: file });
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error uploading file' 
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    await fileService.deleteFile(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error deleting file' 
    });
  }
};

export const getFileByCode = async (req, res) => {
  try {
    const file = await fileService.getFileByCode(req.params.code);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ data: file });
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error fetching file' 
    });
  }
};