import { AuthProvider } from 'react-admin';

const apiUrl = 'http://localhost:8000/api';

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        return fetch(`${apiUrl}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(({ access, refresh, user }) => {
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((error) => {
            throw new Error('Network error: ' + error.message);
        });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        const user = localStorage.getItem('user');
        if (user) {
            const { role } = JSON.parse(user);
            return Promise.resolve(role);
        }
        return Promise.reject();
    },

    getIdentity: () => {
        try {
            const { id, username, avatar } = JSON.parse(localStorage.getItem('user') || '{}');
            return Promise.resolve({ id, fullName: username, avatar });
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default authProvider;
