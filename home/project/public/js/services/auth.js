import { getFromStorage, setInStorage } from '../utils/storage.js';

class AuthService {
    constructor() {
        this.user = null;
        this.checkAuth();
    }

    async login(email, password) {
        const user = { email, id: Date.now() };
        this.setUser(user);
        return user;
    }

    async register(email, password) {
        const user = { email, id: Date.now() };
        this.setUser(user);
        return user;
    }

    logout() {
        localStorage.removeItem('user');
        this.user = null;
        window.dispatchEvent(new Event('auth-change'));
    }

    setUser(user) {
        this.user = user;
        setInStorage('user', user);
        window.dispatchEvent(new Event('auth-change'));
    }

    checkAuth() {
        const user = getFromStorage('user', null);
        if (user) {
            this.user = user;
        }
    }

    isAuthenticated() {
        return !!this.user;
    }
}

export const auth = new AuthService();