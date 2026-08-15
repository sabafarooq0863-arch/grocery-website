import {
  getProducts,
  getCategories,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
  placeOrder
} from './api.js';

import { renderHeader } from './header.js';
import { createProductCard } from './productCard.js';

const appContent = document.getElementById('app-content');

let currentCategory = '';
let currentSearch = '';

export function showToast(message, type = 'success') {
  const toast = document.createElement('div');

  toast.textContent = message;

  toast.style.cssText = `
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 9999;
    padding: 14px 20px;
    border-radius: 12px;
    background: ${type === 'error' ? '#EF4444' : '#2D6A4F'};
    color: white;
    font-family: Inter, sans-serif;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,.2);
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

/* =========================
   SHOP PAGE
========================= */

async function loadShop() {
  try {
    appContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">🛒</div>
        <h2>Loading FreshCart...</h2>
      </div>
    `;

    const [products, categories] = await Promise.all([
      getProducts({
        category: currentCategory,
        search: currentSearch
      }),
      getCategories()
    ]);

    renderShop(products, categories);

  } catch (error) {
    console.error(error);

    appContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">😕</div>
        <h2>Something went wrong</h2>
        <p>Products load nahi ho sake.</p>
      </div>
    `;
  }
}

function renderShop(products, categories) {

  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.categories || [];

  const orbitProducts = productList
    .filter(product => product.image)
    .slice(0, 8);

  appContent.innerHTML = `
    <section class="hero">
      <div class="hero-layout">
      <div class="hero-content">
        <div class="hero-emoji">🛒</div>

        <h1>Fresh Groceries, Delivered</h1>

        <p>
          FreshCart se apni favorite groceries easily shop karein.
        </p>
      </div>

        <div class="hero-orbit" aria-hidden="true">
          <div class="orbit-track">
            ${orbitProducts.map((product, index) => `
              <div class="orbit-item" style="--orbit-angle: ${index * 45}deg">
                <span>${product.image}</span>
              </div>
            `).join('')}
          </div>
          <div class="orbit-center">🛒</div>
        </div>
      </div>
    </section>

    <div class="container">

      <div class="category-filters">

        <button
          class="category-pill ${currentCategory === '' ? 'active' : ''}"
          data-category="">
          All
        </button>

        ${categoryList.map(category => {

          const name =
            typeof category === 'string'
              ? category
              : category.name ||
                category.title ||
                category.category ||
                '';

          return `
            <button
              class="category-pill ${currentCategory === name ? 'active' : ''}"
              data-category="${name}">
              ${name}
            </button>
          `;

        }).join('')}

      </div>

      <section class="products-section">

        <div class="products-count">
          ${productList.length} products found
        </div>

        <div class="products-grid" id="products-grid"></div>

      </section>

    </div>
  `;

  const grid = document.getElementById('products-grid');

  if (productList.length === 0) {

    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">🥕</div>
        <h2>No products found</h2>
        <p>Try another category or search.</p>
      </div>
    `;

    return;
  }

  productList.forEach(product => {

    const card = createProductCard(product);

    grid.appendChild(card);

  });

  document.querySelectorAll('[data-category]').forEach(button => {

    button.addEventListener('click', () => {

      currentCategory = button.dataset.category;

      loadShop();

    });

  });
}

/* =========================
   CART PAGE
========================= */

async function loadCartPage() {

  try {

    appContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">🛍️</div>
        <h2>Loading Cart...</h2>
      </div>
    `;

    const cart = await getCart();

    renderCart(cart);

  } catch (error) {

    console.error(error);

    appContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-emoji">😕</div>
        <h2>Unable to load cart</h2>
        <p>Please try again.</p>
      </div>
    `;
  }
}

function renderCart(cart) {

  const items = cart.items || [];

  if (items.length === 0) {

    appContent.innerHTML = `
      <div class="cart-page">

        <div class="container">

          <div class="empty-state">

            <div class="empty-state-emoji">🛒</div>

            <h2>Your cart is empty</h2>

            <p>Add some fresh groceries to your cart.</p>

            <a href="#/" class="btn-shop">
              🛍️ Start Shopping
            </a>

          </div>

        </div>

      </div>
    `;

    return;
  }

  const subtotal =
    cart.subtotal ??
    items.reduce(
      (sum, item) =>
        sum + Number(item.price || item.product?.price || 0) *
        Number(item.quantity || 0),
      0
    );

  appContent.innerHTML = `
    <div class="cart-page">

      <div class="container">

        <h1 class="page-title">
          🛒 Your Cart
        </h1>

        <div class="cart-layout">

          <div class="cart-items">

            ${items.map(item => {

              const product = item.product || item;

              const id =
                item.productId ||
                product.id;

              const name =
                product.name ||
                item.name ||
                'Product';

              const image =
                product.image ||
                item.image ||
                '🛒';

              const price =
                Number(product.price || item.price || 0);

              const quantity =
                Number(item.quantity || 1);

              return `
                <div class="cart-item">

                  <div class="cart-item-emoji">
                    ${image}
                  </div>

                  <div class="cart-item-info">

                    <div class="cart-item-name">
                      ${name}
                    </div>

                    <div class="cart-item-unit-price">
                      $${price.toFixed(2)} each
                    </div>

                  </div>

                  <div class="cart-item-controls">

                    <div class="quantity-controls">

                      <button
                        class="qty-btn"
                        data-cart-dec="${id}">
                        −
                      </button>

                      <span class="qty-value">
                        ${quantity}
                      </span>

                      <button
                        class="qty-btn"
                        data-cart-inc="${id}">
                        +
                      </button>

                    </div>

                    <div class="cart-item-total">
                      $${(price * quantity).toFixed(2)}
                    </div>

                    <button
                      class="btn-remove"
                      data-cart-remove="${id}">
                      ✕
                    </button>

                  </div>

                </div>
              `;

            }).join('')}

          </div>

          <aside class="cart-summary">

            <h3>Order Summary</h3>

            <div class="summary-row">

              <span>Subtotal</span>

              <span class="value">
                $${Number(subtotal).toFixed(2)}
              </span>

            </div>

            <div class="summary-row">

              <span>Delivery</span>

              <span class="value">
                Free
              </span>

            </div>

            <div class="summary-row total">

              <span>Total</span>

              <span class="value">
                $${Number(subtotal).toFixed(2)}
              </span>

            </div>

            <button
              class="btn-checkout"
              id="checkout-btn">
              Proceed to Checkout
            </button>

            <button
              class="btn-clear-cart"
              id="clear-cart-btn">
              Clear Cart
            </button>

          </aside>

        </div>

      </div>

    </div>
  `;

  bindCartEvents();

}

/* =========================
   CART EVENTS
========================= */

function bindCartEvents() {

  document.querySelectorAll('[data-cart-inc]').forEach(button => {

    button.addEventListener('click', async () => {

      const id = button.dataset.cartInc;

      const item =
        button.closest('.cart-item');

      const qtyElement =
        item.querySelector('.qty-value');

      const current =
        Number(qtyElement.textContent);

      try {

        await updateCart(id, current + 1);

        await loadCartPage();

      } catch (error) {

        showToast('Unable to update quantity', 'error');

      }

    });

  });

  document.querySelectorAll('[data-cart-dec]').forEach(button => {

    button.addEventListener('click', async () => {

      const id = button.dataset.cartDec;

      const item =
        button.closest('.cart-item');

      const qtyElement =
        item.querySelector('.qty-value');

      const current =
        Number(qtyElement.textContent);

      try {

        if (current <= 1) {

          await removeFromCart(id);

        } else {

          await updateCart(id, current - 1);

        }

        await loadCartPage();

      } catch (error) {

        showToast('Unable to update quantity', 'error');

      }

    });

  });

  document.querySelectorAll('[data-cart-remove]').forEach(button => {

    button.addEventListener('click', async () => {

      const id = button.dataset.cartRemove;

      try {

        await removeFromCart(id);

        showToast('Item removed from cart');

        await loadCartPage();

      } catch (error) {

        showToast('Unable to remove item', 'error');

      }

    });

  });

  const clearButton =
    document.getElementById('clear-cart-btn');

  if (clearButton) {

    clearButton.addEventListener('click', async () => {

      try {

        await clearCart();

        showToast('Cart cleared');

        await loadCartPage();

      } catch (error) {

        showToast('Unable to clear cart', 'error');

      }

    });

  }

  const checkoutButton =
    document.getElementById('checkout-btn');

  if (checkoutButton) {

    checkoutButton.addEventListener('click', () => {

      showToast(
        'Checkout page is ready for the next step!'
      );

    });

  }

}

/* =========================
   SEARCH
========================= */

function handleSearch(value) {

  currentSearch = value.trim();

  if (window.location.hash !== '#/') {

    window.location.hash = '#/';

  } else {

    loadShop();

  }

}

/* =========================
   ROUTER
========================= */

function handleRoute() {

  const hash =
    window.location.hash || '#/';

  if (hash === '#/cart') {

    loadCartPage();

  } else {

    loadShop();

  }

}

/* =========================
   START APP
========================= */

function startApp() {

  renderHeader(handleSearch);

  window.addEventListener(
    'hashchange',
    handleRoute
  );

  handleRoute();

}

startApp();