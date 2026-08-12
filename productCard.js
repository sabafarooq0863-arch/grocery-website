// ============================================================
// FreshCart — Product Card Component
// Agent 3: Frontend Developer
// Renders a single product card with add-to-cart functionality
// ============================================================

import { addToCart, updateCart, removeFromCart, getCart } from '../api.js';
import { updateCartBadge } from './header.js';
import { showToast } from '../app.js';

export function createProductCard(product, cartQuantity = 0) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.id = `product-${product.id}`;

  const stars = getStars(product.rating);
  const inCart = cartQuantity > 0;

  card.innerHTML = `
    <div class="product-card-image">
      <span>${product.image}</span>
      <span class="product-card-badge ${product.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}">
        ${product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
      </span>
    </div>
    <div class="product-card-body">
      <span class="product-card-category">${product.category}</span>
      <h3 class="product-card-name">${product.name}</h3>
      <p class="product-card-desc">${product.description}</p>
      <div class="product-card-rating">
        <span class="stars">${stars}</span>
        <span class="rating-value">${product.rating}</span>
      </div>
    </div>
    <div class="product-card-footer">
      <div class="product-price">
        <span class="price-amount">$${product.price.toFixed(2)}</span>
        <span class="price-unit">per ${product.unit}</span>
      </div>
      <div class="card-action" id="action-${product.id}">
        ${inCart ? quantityControlsHTML(product.id, cartQuantity) : addButtonHTML(product)}
      </div>
    </div>
  `;

  // Bind events after insertion
  setTimeout(() => bindCardEvents(product, card), 0);

  return card;
}

function addButtonHTML(product) {
  return `
    <button class="btn-add-cart" ${!product.inStock ? 'disabled' : ''} data-add="${product.id}">
      + Add
    </button>
  `;
}

function quantityControlsHTML(productId, qty) {
  return `
    <div class="quantity-controls">
      <button class="qty-btn" data-dec="${productId}">−</button>
      <span class="qty-value">${qty}</span>
      <button class="qty-btn" data-inc="${productId}">+</button>
    </div>
  `;
}

function bindCardEvents(product, card) {
  // Add to cart button
  card.addEventListener('click', async (e) => {
    const addBtn = e.target.closest('[data-add]');
    const incBtn = e.target.closest('[data-inc]');
    const decBtn = e.target.closest('[data-dec]');

    if (addBtn) {
      try {
        await addToCart(product.id, 1);
        const actionDiv = card.querySelector(`#action-${product.id}`);
        actionDiv.innerHTML = quantityControlsHTML(product.id, 1);
        updateCartBadge(true);
        showToast(`${product.image} ${product.name} added to cart!`, 'success');
      } catch (err) {
        showToast('Failed to add item', 'error');
      }
    }

    if (incBtn) {
      try {
        const qtySpan = card.querySelector('.qty-value');
        const newQty = parseInt(qtySpan.textContent) + 1;
        await updateCart(product.id, newQty);
        qtySpan.textContent = newQty;
        updateCartBadge(true);
      } catch (err) {
        showToast('Failed to update quantity', 'error');
      }
    }

    if (decBtn) {
      try {
        const qtySpan = card.querySelector('.qty-value');
        const currentQty = parseInt(qtySpan.textContent);
        if (currentQty <= 1) {
          await removeFromCart(product.id);
          const actionDiv = card.querySelector(`#action-${product.id}`);
          actionDiv.innerHTML = addButtonHTML(product);
          updateCartBadge(true);
        } else {
          const newQty = currentQty - 1;
          await updateCart(product.id, newQty);
          qtySpan.textContent = newQty;
          updateCartBadge(true);
        }
      } catch (err) {
        showToast('Failed to update quantity', 'error');
      }
    }
  });
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
