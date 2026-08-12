// ============================================================
// FreshCart — API Client
// Agent 3: Frontend Developer
// Fetch wrapper for all backend API calls
// ============================================================

const BASE = '/api';

async function request(url, options = {}) {
  try {
    const res = await fetch(`${BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Request failed');
    return data.data;
  } catch (err) {
    console.error(`API Error [${url}]:`, err);
    throw err;
  }
}

// ── Products ────────────────────────────────────────────────
export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  const qs = query.toString();
  return request(`/products${qs ? `?${qs}` : ''}`);
}

export async function getProduct(id) {
  return request(`/products/${id}`);
}

export async function getCategories() {
  return request('/categories');
}

// ── Cart ────────────────────────────────────────────────────
export async function getCart() {
  return request('/cart');
}

export async function addToCart(productId, quantity = 1) {
  return request('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCart(productId, quantity) {
  return request('/cart/update', {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removeFromCart(productId) {
  return request(`/cart/remove/${productId}`, { method: 'DELETE' });
}

export async function clearCart() {
  return request('/cart/clear', { method: 'DELETE' });
}

// ── Orders ──────────────────────────────────────────────────
export async function placeOrder(customer) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify({ customer }),
  });
}

export async function getOrders() {
  return request('/orders');
}

export async function getOrder(id) {
  return request(`/orders/${id}`);
}
