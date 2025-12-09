import axios from 'axios';

const customFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
});

customFetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jobify_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default customFetch;
