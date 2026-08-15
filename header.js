// ============================================================
// FreshCart — Header Component
// Agent 3: Frontend Developer
// Sticky glassmorphism header with logo, search, cart badge
// ============================================================

import { getCart } from './api.js';

let currentCartCount = 0;

export function renderHeader(onSearch) {
  const header = document.getElementById('app-header');
  const currentHash = window.location.hash || '#/';

  header.innerHTML = `
    <div class="header">
      <div class="header-inner">
        <a class="header-logo" href="#/" id="header-logo">
          <span class="header-logo-icon">🛒</span>
          <span class="header-logo-text">FreshCart</span>
        </a>

        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-input"
            id="search-input"
            placeholder="Search for groceries..."
            aria-label="Search products"
          />
        </div>

        <nav class="header-nav" aria-label="Main navigation">
          <a class="nav-link ${currentHash === '#/' ? 'active' : ''}" href="#/" id="nav-home">
            🏠 Shop
          </a>
          <a class="nav-link ${currentHash === '#/cart' ? 'active' : ''}" href="#/cart" id="nav-cart" style="position:relative">
            🛍️ Cart
            <span class="cart-badge" id="cart-badge">0</span>
          </a>
        </nav>
      </div>
    </div>
  `;

  // Search handler with debounce
  const searchInput = document.getElementById('search-input');
  let debounceTimer;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (onSearch) onSearch(e.target.value);
    }, 300);
  });

  // Update badge
  updateCartBadge();
}

export async function updateCartBadge(animate = false) {
  try {
    const cart = await getCart();
    const badge = document.getElementById('cart-badge');
    if (!badge) return;

    const count = cart.totalItems || 0;
    badge.textContent = count;

    if (count > 0) {
      badge.classList.add('visible');
      if (animate && count !== currentCartCount) {
        badge.classList.remove('pulse');
        // Force reflow for re-triggering animation
        void badge.offsetWidth;
        badge.classList.add('pulse');
      }
    } else {
      badge.classList.remove('visible');
    }

    currentCartCount = count;
  } catch (e) {
    // Silently fail — badge will update on next call
  }
}
