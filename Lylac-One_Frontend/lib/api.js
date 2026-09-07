import axios from 'axios';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://recognised-klein-rendering-survey.trycloudflare.com';
export const STORE_CODE = process.env.NEXT_PUBLIC_STORE_CODE || 'DEFAULT';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// Token helpers (client-side only)
export const tokenStore = {
  get: () => (typeof window !== 'undefined' ? window.localStorage.getItem('lylac-token') : null),
  set: (t) => { if (typeof window !== 'undefined') window.localStorage.setItem('lylac-token', t); },
  clear: () => { if (typeof window !== 'undefined') window.localStorage.removeItem('lylac-token'); },
};

// Attach store code & JWT
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // Attach store param to storefront endpoints (Shopizer requires ?store=CODE)
  const publicPath = /^\/api\/v\d\/(products|product|category|manufacturers|manufacturer|search|store|cart|content|config)/;
  if (publicPath.test(config.url || '') && !(config.params && config.params.store) && !/\/customer\/(login|register|password)/.test(config.url || '')) {
    config.params = { store: STORE_CODE, ...(config.params || {}) };
  }
  return config;
});

// Response interceptor — normalize errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err?.message || 'Something went wrong';
    const normalized = { status, message: msg, data: err?.response?.data, isNetwork: !err?.response };
    if (status === 401 && typeof window !== 'undefined') {
      tokenStore.clear();
      // Broadcast so UI can react (login screen etc.)
      window.dispatchEvent(new CustomEvent('lylac:unauthorized'));
    }
    return Promise.reject(normalized);
  }
);

// Fix image URLs coming from backend (localhost) -> point to API host
export function fixImageUrl(url) {
  if (!url) return null;
  return url.replace(/http:\/\/localhost:8080/gi, API_BASE);
}

export default api;
