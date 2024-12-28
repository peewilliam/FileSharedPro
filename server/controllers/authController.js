import authService from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ 
                error: 'Email, password and name are required' 
            });
        }

        const result = await authService.register({ email, password, name });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ 
            error: error.message || 'Registration failed' 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ 
            error: error.message || 'Login failed' 
        });
    }
};