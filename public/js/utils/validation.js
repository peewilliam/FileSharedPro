// Utilitários de validação
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    return password && password.length >= 8;
}

export function validateFileCode(code) {
    return code && code.length >= 6;
}