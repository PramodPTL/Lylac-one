import api from '@/lib/api';

const LS_CODE = 'lylac-cart-code';
export const cartCodeStore = {
  get: () => (typeof window !== 'undefined' ? window.localStorage.getItem(LS_CODE) : null),
  set: (c) => { if (typeof window !== 'undefined' && c) window.localStorage.setItem(LS_CODE, c); },
  clear: () => { if (typeof window !== 'undefined') window.localStorage.removeItem(LS_CODE); },
};

// POST /api/v1/cart  (create cart with one item)
export async function createCart({ productId, quantity = 1 }) {
  const body = { product: productId, quantity };
  const { data } = await api.post('/api/v1/cart', body);
  if (data?.code) cartCodeStore.set(data.code);
  return data;
}

// PUT /api/v1/cart/{code}  (modify item quantity)
export async function updateCartItem({ code, productId, quantity }) {
  const c = code || cartCodeStore.get();
  if (!c) return createCart({ productId, quantity });
  const { data } = await api.put(`/api/v1/cart/${c}`, { product: productId, quantity });
  return data;
}

// GET /api/v1/cart/{code}
export async function getCart(code) {
  const c = code || cartCodeStore.get();
  if (!c) return null;
  const { data } = await api.get(`/api/v1/cart/${c}`);
  return data;
}

// DELETE /api/v1/cart/{code}/product/{sku}
export async function removeCartItem({ code, sku }) {
  const c = code || cartCodeStore.get();
  if (!c) return null;
  const { data } = await api.delete(`/api/v1/cart/${c}/product/${sku}`);
  return data;
}

// POST /api/v1/cart/{code}/promo/{promo}
export async function applyPromo({ code, promo }) {
  const c = code || cartCodeStore.get();
  if (!c) throw { status: 400, message: 'No cart yet' };
  const { data } = await api.post(`/api/v1/cart/${c}/promo/${promo}`);
  return data;
}

// GET /api/v1/cart/{code}/total
export async function getCartTotal(code) {
  const c = code || cartCodeStore.get();
  if (!c) return null;
  const { data } = await api.get(`/api/v1/cart/${c}/total`);
  return data;
}

// GET /api/v1/auth/customer/cart (authenticated)
export async function getAuthCart() {
  const { data } = await api.get('/api/v1/auth/customer/cart');
  return data;
}
