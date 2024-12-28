export function getFromStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

export function setInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}