import { authService } from './authService.js';

export function requireAuth() {
    if (!authService.isAuthenticated()) {
        window.location.href = '/';
        return false;
    }
    return true;
}

export function redirectIfAuthenticated() {
    if (authService.isAuthenticated()) {
        window.location.href = '/dashboard/';
        return true;
    }
    return false;
}