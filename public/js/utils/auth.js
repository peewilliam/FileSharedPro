export function checkAuth() {
    const user = localStorage.getItem('user');
    return !!user;
}

export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function setUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    window.dispatchEvent(new Event('auth-change'));
}

export function removeUser() {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
}