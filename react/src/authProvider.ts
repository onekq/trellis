import { fetchUtils, AuthProvider } from 'react-admin';

const apiUrl = 'http://localhost:8000/api';
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ROLE_KEY = 'role';

interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        role: string;
    };
}

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/login/`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        try {
            const { json } = await fetchUtils.fetchJson(request) as { json: LoginResponse };
            localStorage.setItem(TOKEN_KEY, json.access);
            localStorage.setItem(REFRESH_TOKEN_KEY, json.refresh);
            localStorage.setItem(ROLE_KEY, json.user.role); // Assuming user role is returned in the response
        } catch (error: any) {
            throw new Error(error.message || 'Network error');
        }
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem(TOKEN_KEY) ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem(ROLE_KEY);
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem(ROLE_KEY);
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;
