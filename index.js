const express = require('express');
const cors = require('cors');
const path = require('path');
const store = require('./store');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── API Routes ───────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  const products = store.getAllProducts({ category, search });
  res.json({ success: true, data: { products } });
});

app.get('/api/products/:id', (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: { product } });
});

app.get('/api/categories', (req, res) => {
  const categories = store.getCategories();
  res.json({ success: true, data: { categories } });
});

app.get('/api/cart', (req, res) => {
  const cart = store.getCart();
  res.json({ success: true, data: cart });
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  const result = store.addToCart(productId, quantity);
  if (result.error) return res.status(400).json({ success: false, error: result.error });
  res.json({ success: true, data: result });
});

app.put('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  const result = store.updateCartItem(productId, quantity);
  if (result.error) return res.status(400).json({ success: false, error: result.error });
  res.json({ success: true, data: result });
});

app.delete('/api/cart/remove/:productId', (req, res) => {
  const result = store.removeFromCart(req.params.productId);
  if (result.error) return res.status(400).json({ success: false, error: result.error });
  res.json({ success: true, data: result });
});

app.delete('/api/cart/clear', (req, res) => {
  const result = store.clearCart();
  res.json({ success: true, data: result });
});

app.post('/api/orders', (req, res) => {
  const { customer } = req.body;
  const result = store.placeOrder(customer);
  if (result.error) return res.status(400).json({ success: false, error: result.error });
  res.json({ success: true, data: result });
});

app.get('/api/orders', (req, res) => {
  const orders = store.getAllOrders();
  res.json({ success: true, data: { orders } });
});

app.get('/api/orders/:id', (req, res) => {
  const order = store.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
  res.json({ success: true, data: { order } });
});

// ── Static Files ─────────────────────────────────────────────
app.use(express.static(__dirname));

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FreshCart server running at http://localhost:${PORT}`);
});
