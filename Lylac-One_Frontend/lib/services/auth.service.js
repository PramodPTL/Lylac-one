import api, { tokenStore } from '@/lib/api';

// POST /api/v1/customer/login
// body: { username, password }
export async function login({ username, password }) {
  const { data } = await api.post('/api/v1/customer/login', { username, password });
  // Response typically: { id, token, ... }
  const token = data?.token || data?.access_token || data?.accessToken;
  if (token) tokenStore.set(token);
  return data;
}

// POST /api/v1/customer/register
export async function register(payload) {
  // Shopizer expected fields: userName, emailAddress, firstName, lastName, password, storeCode, gender, language
  const { data } = await api.post('/api/v1/customer/register', payload);
  const token = data?.token || data?.access_token;
  if (token) tokenStore.set(token);
  return data;
}

// GET /api/v1/auth/customer/profile
export async function getProfile() {
  const { data } = await api.get('/api/v1/auth/customer/profile');
  return data;
}

// PATCH /api/v1/auth/customer/
export async function updateProfile(payload) {
  const { data } = await api.patch('/api/v1/auth/customer/', payload);
  return data;
}

// PATCH /api/v1/auth/customer/address
export async function updateAddress(payload) {
  const { data } = await api.patch('/api/v1/auth/customer/address', payload);
  return data;
}

// POST /api/v1/customer/password/reset/request
export async function requestPasswordReset(email) {
  const { data } = await api.post('/api/v1/customer/password/reset/request', { email });
  return data;
}

// POST /api/v1/auth/customer/password
export async function changePassword(payload) {
  const { data } = await api.post('/api/v1/auth/customer/password', payload);
  return data;
}

// GET /api/v1/auth/customer/refresh
export async function refreshToken() {
  const { data } = await api.get('/api/v1/auth/customer/refresh');
  const t = data?.token; if (t) tokenStore.set(t);
  return data;
}

export function logout() { tokenStore.clear(); }
// TODO: Missing backend endpoint for OTP verification (SMS/phone)
// TODO: Missing backend endpoint for Google/Social login
