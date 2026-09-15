import api, { fixImageUrl } from '@/lib/api';

// GET /api/v1/products (list)
export async function listProducts({ page = 0, count = 24, category, manufacturer, keyword } = {}) {
  const params = { page, count };
  if (category) params.category = category;
  if (manufacturer) params.manufacturer = manufacturer;
  if (keyword) params.keyword = keyword;
  const { data } = await api.get('/api/v1/products', { params });
  return {
    total: data?.recordsTotal || 0,
    totalPages: data?.totalPages || 1,
    page: data?.number || 0,
    products: (data?.products || []).map(normalizeProduct),
  };
}

// GET /api/v1/product/{friendlyUrl}
export async function getProduct(friendlyUrl) {
  const { data } = await api.get(`/api/v1/product/${encodeURIComponent(friendlyUrl)}`);
  return normalizeProduct(data);
}

// GET /api/v1/product/{id}/related
export async function getRelated(id) {
  try {
    const { data } = await api.get(`/api/v1/product/${id}/related`);
    return (Array.isArray(data) ? data : (data?.products || [])).map(normalizeProduct);
  } catch { return []; }
}

// POST /api/v1/search
export async function searchProducts({ query, count = 20 } = {}) {
  try {
    const { data } = await api.post('/api/v1/search', { query, count });
    return { products: (data?.products || []).map(normalizeProduct), total: data?.count || 0 };
  } catch { return { products: [], total: 0 }; }
}

// POST /api/v1/search/autocomplete
export async function autocomplete(query) {
  try {
    const { data } = await api.post('/api/v1/search/autocomplete', { query });
    return data?.values || [];
  } catch { return []; }
}

// GET /api/v1/category (list)
export async function listCategories() {
  const { data } = await api.get('/api/v1/category');
  const arr = data?.categories || data?.list || [];
  return arr.map((c) => ({
    id: c.id,
    code: c.code,
    name: c?.description?.name || c.code,
    slug: c?.description?.friendlyUrl,
    productCount: c.productCount || 0,
    children: c.children || [],
  }));
}

// GET /api/v1/manufacturers
export async function listManufacturers() {
  try {
    const { data } = await api.get('/api/v1/manufacturers');
    return (data?.manufacturers || []).map((m) => ({ id: m.id, code: m.code, name: m?.description?.name || m.code }));
  } catch { return []; }
}

// GET /api/v1/product/{id}/reviews
export async function listReviews(id) {
  try {
    const { data } = await api.get(`/api/v1/product/${id}/reviews`);
    return Array.isArray(data) ? data : (data?.reviews || []);
  } catch { return []; }
}

export function normalizeProduct(p) {
  if (!p) return null;
  const desc = p.description || {};
  const price = p.finalPrice ? parseFloat(String(p.finalPrice).replace(/[^\d.]/g, '')) : p.price;
  const mrp = p.originalPrice ? parseFloat(String(p.originalPrice).replace(/[^\d.]/g, '')) : price;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  return {
    id: p.id,
    sku: p.sku,
    slug: desc.friendlyUrl || `product-${p.id}`,
    name: desc.name || 'Unnamed product',
    brand: p?.manufacturer?.description?.name || p?.manufacturer?.code || '—',
    manufacturer: p?.manufacturer?.description?.name || 'Unknown',
    image: fixImageUrl(p?.image?.imageUrl) || 'https://images.pexels.com/photos/51929/medications-cure-tablets-pharmacy-51929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: price || 0, mrp: mrp || 0, discount,
    rating: p.rating || 4.5,
    reviews: p.ratingCount || 0,
    pack: p.productSpecifications?.dimensions ? '' : (desc.title || ''),
    composition: desc.description || '',
    uses: desc.metaDescription || desc.description || '',
    dosage: 'As prescribed',
    sideEffects: '—',
    rx: false, // TODO: Backend has no prescription flag; assume false
    category: 'otc',
    concern: null,
    inStock: (p.quantity ?? 0) > 0 || p.available,
    fastDelivery: true,
    isLive: true,
  };
}
