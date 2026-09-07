import api from '@/lib/api';

// POST /api/v1/cart/{code}/checkout (guest) or /api/v1/auth/cart/{code}/checkout (authed)
export async function checkoutCart({ code, authed = false, payload = {} }) {
  const url = authed ? `/api/v1/auth/cart/${code}/checkout` : `/api/v1/cart/${code}/checkout`;
  const { data } = await api.post(url, payload);
  return data;
}

// POST /api/v1/cart/{code}/payment/init
export async function initPayment({ code, authed = false, payload = {} }) {
  const url = authed ? `/api/v1/auth/cart/${code}/payment/init` : `/api/v1/cart/${code}/payment/init`;
  const { data } = await api.post(url, payload);
  return data;
}

// GET /api/v1/auth/orders
export async function listOrders({ page = 0, count = 20 } = {}) {
  const { data } = await api.get('/api/v1/auth/orders', { params: { page, count } });
  return {
    total: data?.recordsTotal || 0,
    orders: (data?.orders || []).map(normalizeOrder),
  };
}

// GET /api/v1/auth/orders/{id}
export async function getOrder(id) {
  const { data } = await api.get(`/api/v1/auth/orders/${id}`);
  return normalizeOrder(data);
}

// GET /api/v1/cart/{code}/shipping (or authed)
export async function getShippingQuote({ code, authed = false, payload = {} }) {
  const url = authed ? `/api/v1/auth/cart/${code}/shipping` : `/api/v1/cart/${code}/shipping`;
  const { data } = await api.get(url, { params: payload });
  return data;
}

export function normalizeOrder(o) {
  if (!o) return null;
  return {
    id: o.id,
    invoice: o.orderId || o.id,
    status: o.status || o.orderStatus,
    total: o.total?.value || o.total || 0,
    date: o.datePurchased || o.orderDate,
    items: (o.products || []).length,
    pharmacy: o.store?.name || 'Rajaram Medical store',
    products: o.products || [],
    raw: o,
  };
}
