import api, { fixImageUrl } from '@/lib/api';

// GET /api/v1/store/{code}
export async function getStore(code) {
  const { data } = await api.get(`/api/v1/store/${code}`);
  return normalizeStore(data);
}

// GET /api/v1/private/stores  -- requires admin auth, may fail for customers
// Alternative: we know DEFAULT is the only public store.
// TODO: Backend has no public 'nearby pharmacies' endpoint — we fall back to mock list merged with live store.
export async function listStores() {
  try {
    const { data } = await api.get('/api/v1/private/stores');
    const arr = Array.isArray(data) ? data : (data?.data || data?.stores || []);
    return arr.map(normalizeStore);
  } catch {
    return [];
  }
}

export function normalizeStore(s) {
  if (!s) return null;
  const addr = s.address || {};
  return {
    id: `live-${s.code || s.id}`,
    slug: (s.code || 'DEFAULT').toLowerCase(),
    code: s.code || 'DEFAULT',
    name: s.name || 'Store',
    logo: (s.name || 'S').charAt(0).toUpperCase(),
    logoUrl: fixImageUrl(s?.logo?.path),
    image: fixImageUrl(s?.logo?.path) || 'https://images.pexels.com/photos/32116001/pexels-photo-32116001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    email: s.email,
    phone: s.phone,
    currency: s.currency,
    inBusinessSince: s.inBusinessSince,
    address: [addr.address, addr.city, addr.stateProvince, addr.postalCode].filter(Boolean).join(', '),
    isLive: true,
    // Fields we don't get from backend — sensible defaults so cards render:
    rating: 4.7, reviews: 320, distance: '— km', deliveryTime: '30 min', isOpen: true,
    freeDelivery: true, minOrder: 99, discount: '15% OFF', categories: ['Medicines', 'OTC', 'Wellness'],
    hours: '9 AM - 10 PM',
  };
}
