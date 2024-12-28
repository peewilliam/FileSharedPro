import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class JsonDB {
  constructor(filename) {
    this.filepath = path.join(__dirname, '../data', filename);
  }

  async readData() {
    try {
      const data = await fs.readFile(this.filepath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.writeData([]);
        return [];
      }
      throw error;
    }
  }

  async writeData(data) {
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
  }

  async findOne(query) {
    const data = await this.readData();
    return data.find(item => 
      Object.entries(query).every(([key, value]) => item[key] === value)
    );
  }

  async find(query = {}) {
    const data = await this.readData();
    return data.filter(item =>
      Object.entries(query).every(([key, value]) => item[key] === value)
    );
  }

  async insert(item) {
    const data = await this.readData();
    const newItem = { id: Date.now().toString(), ...item };
    data.push(newItem);
    await this.writeData(data);
    return newItem;
  }

  async update(id, updates) {
    const data = await this.readData();
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    data[index] = { ...data[index], ...updates };
    await this.writeData(data);
    return data[index];
  }

  async delete(id) {
    const data = await this.readData();
    const filtered = data.filter(item => item.id !== id);
    await this.writeData(filtered);
  }
}

export default JsonDB;