import JsonDB from '../utils/jsonDb.js';
import { hashPassword, comparePasswords } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

class AuthService {
    constructor() {
        this.db = new JsonDB('users.json');
    }

    async register({ email, password, name }) {
        // Check if user already exists
        const existingUser = await this.db.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const user = await this.db.insert({
            email,
            password: hashedPassword,
            name,
            createdAt: new Date().toISOString()
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        const token = generateToken(userWithoutPassword);

        return { user: userWithoutPassword, token };
    }

    async login(email, password) {
        const user = await this.db.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        const { password: _, ...userWithoutPassword } = user;
        const token = generateToken(userWithoutPassword);

        return { user: userWithoutPassword, token };
    }
}

export default new AuthService();