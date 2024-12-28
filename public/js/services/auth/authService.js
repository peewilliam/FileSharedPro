class AuthService {
    constructor() {
        this.user = null;
        this.token = null;
        this.init();
    }

    init() {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            try {
                this.token = token;
                this.user = JSON.parse(userData);
            } catch (error) {
                this.clearAuth();
            }
        }
    }

    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            this.setAuth(data.user, data.token);
            return data.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(email, password, name) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            this.setAuth(data.user, data.token);
            return data.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    setAuth(user, token) {
        this.user = user;
        this.token = token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        window.dispatchEvent(new Event('auth-change'));
    }

    clearAuth() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('auth-change'));
    }

    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    logout() {
        this.clearAuth();
        window.location.href = '/';
    }

    getAuthHeader() {
        return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
    }
}

export const authService = new AuthService();