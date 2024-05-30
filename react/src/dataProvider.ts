import { fetchUtils, DataProvider } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = 'http://localhost:8000/api';

interface HttpResponse {
    status: number;
    statusText: string;
    headers: Headers;
    body: string;
    json: any; // Make json property non-optional
}

const httpClient = (url: string, options: fetchUtils.Options = {}): Promise<HttpResponse> => {
    if (!options.headers) {
        options.headers = new Headers({ 'Content-Type': 'application/json' });
    } else if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers);
    }
    const token = localStorage.getItem('token');
    if (token) {
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options) as Promise<HttpResponse>;
};

const dataProvider: DataProvider = simpleRestProvider(apiUrl, httpClient as any);

export default dataProvider;
