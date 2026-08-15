// ============================================================
// FreshCart — In-Memory Data Store
// Agent 2: Backend Developer
// Manages products, cart, and orders in memory
// ============================================================

const seedProducts = require('./products');

// ── State ───────────────────────────────────────────────────
let products = [...seedProducts];
let cart = { items: [] };
let orders = [];
let orderCounter = 1000;

// ── Product Methods ─────────────────────────────────────────

function getAllProducts({ category, search } = {}) {
  let result = [...products];

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  return result;
}

function getProductById(id) {
  return products.find(p => p.id === id) || null;
}

function getCategories() {
  return [...new Set(products.map(p => p.category))];
}

// ── Cart Methods ────────────────────────────────────────────

function getCart() {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return {
    items: cart.items,
    totalItems,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return { error: 'Product not found' };
  if (!product.inStock) return { error: 'Product is out of stock' };

  const existing = cart.items.find(item => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, product, quantity });
  }

  return getCart();
}

function updateCartItem(productId, quantity) {
  const item = cart.items.find(i => i.productId === productId);
  if (!item) return { error: 'Item not in cart' };

  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  item.quantity = quantity;
  return getCart();
}

function removeFromCart(productId) {
  const index = cart.items.findIndex(i => i.productId === productId);
  if (index === -1) return { error: 'Item not in cart' };

  cart.items.splice(index, 1);
  return getCart();
}

function clearCart() {
  cart.items = [];
  return getCart();
}

// ── Order Methods ───────────────────────────────────────────

function placeOrder(customer) {
  const currentCart = getCart();
  if (currentCart.items.length === 0) return { error: 'Cart is empty' };

  const order = {
    id: `ORD-${++orderCounter}`,
    items: [...currentCart.items],
    totalPrice: currentCart.totalPrice,
    customer,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  clearCart();

  return order;
}

function getAllOrders() {
  return [...orders].reverse();
}

function getOrderById(id) {
  return orders.find(o => o.id === id) || null;
}

// ── Exports ─────────────────────────────────────────────────

module.exports = {
  getAllProducts,
  getProductById,
  getCategories,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  placeOrder,
  getAllOrders,
  getOrderById,
};
