// Base API client for making HTTP requests
export class ApiClient {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json',
            'x-user-id': localStorage.getItem('userId') || 'demo-user'
        };
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: this.headers
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }

    async put(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }

    async delete(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: this.headers
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.status === 204 ? null : response.json();
    }
}