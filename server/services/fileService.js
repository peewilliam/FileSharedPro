import JsonDB from '../utils/jsonDb.js';
import { generateCode } from '../utils/codeGenerator.js';

class FileService {
  constructor() {
    this.db = new JsonDB('files.json');
  }

  async getFiles(userId) {
    return this.db.find({ userId, deleted: false });
  }

  async uploadFile(fileData, userId) {
    const newFile = {
      userId,
      name: fileData.name,
      size: fileData.size,
      type: fileData.type,
      downloads: 0,
      code: generateCode(),
      createdAt: new Date().toISOString(),
      deleted: false
    };

    return this.db.insert(newFile);
  }

  async deleteFile(fileId, userId) {
    const file = await this.db.findOne({ id: fileId, userId });
    if (!file) {
      throw new Error('File not found');
    }

    return this.db.update(fileId, { deleted: true });
  }

  async getFileByCode(code) {
    return this.db.findOne({ code, deleted: false });
  }

  async incrementDownloads(fileId) {
    const file = await this.db.findOne({ id: fileId });
    if (!file) return;

    return this.db.update(fileId, { 
      downloads: (file.downloads || 0) + 1 
    });
  }
}

export default new FileService();