import api from '@/lib/api';

// GET /api/v1/content/boxes  (banners / promos)
export async function listContentBoxes() {
  try { const { data } = await api.get('/api/v1/content/boxes'); return data?.list || data || []; }
  catch { return []; }
}

// GET /api/v1/config  (public store config)
export async function getConfig() {
  try { const { data } = await api.get('/api/v1/config'); return data; } catch { return null; }
}

// GET /api/v1/content/pages  (privacy, tos, about)
export async function listContentPages() {
  try { const { data } = await api.get('/api/v1/content/pages'); return data?.list || data || []; }
  catch { return []; }
}
