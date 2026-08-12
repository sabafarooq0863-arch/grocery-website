// ============================================================
// FreshCart — Product Seed Data
// Agent 2: Backend Developer
// 42 grocery items across 6 categories
// ============================================================

const products = [
  // ── Fruits ────────────────────────────────────────────────
  { id: "fruit-001", name: "Royal Gala Apples", category: "Fruits", price: 3.49, unit: "kg", image: "🍎", description: "Crisp and sweet red apples, perfect for snacking or baking.", inStock: true, rating: 4.5 },
  { id: "fruit-002", name: "Cavendish Bananas", category: "Fruits", price: 1.99, unit: "kg", image: "🍌", description: "Perfectly ripe yellow bananas, rich in potassium.", inStock: true, rating: 4.7 },
  { id: "fruit-003", name: "Navel Oranges", category: "Fruits", price: 4.29, unit: "kg", image: "🍊", description: "Juicy seedless oranges bursting with vitamin C.", inStock: true, rating: 4.3 },
  { id: "fruit-004", name: "Fresh Strawberries", category: "Fruits", price: 5.99, unit: "pack", image: "🍓", description: "Sweet and fragrant strawberries, hand-picked at peak ripeness.", inStock: true, rating: 4.8 },
  { id: "fruit-005", name: "Hass Avocados", category: "Fruits", price: 2.49, unit: "piece", image: "🥑", description: "Creamy ripe avocados, perfect for toast or guacamole.", inStock: true, rating: 4.6 },
  { id: "fruit-006", name: "Green Grapes", category: "Fruits", price: 4.99, unit: "kg", image: "🍇", description: "Crunchy seedless green grapes, great for snacking.", inStock: true, rating: 4.4 },
  { id: "fruit-007", name: "Watermelon", category: "Fruits", price: 6.99, unit: "piece", image: "🍉", description: "Refreshing juicy watermelon, perfect for summer.", inStock: false, rating: 4.2 },

  // ── Vegetables ────────────────────────────────────────────
  { id: "veg-001", name: "Roma Tomatoes", category: "Vegetables", price: 3.29, unit: "kg", image: "🍅", description: "Firm and flavorful tomatoes, ideal for salads and sauces.", inStock: true, rating: 4.4 },
  { id: "veg-002", name: "Baby Carrots", category: "Vegetables", price: 2.49, unit: "pack", image: "🥕", description: "Sweet and crunchy baby carrots, ready to eat.", inStock: true, rating: 4.5 },
  { id: "veg-003", name: "Broccoli Crown", category: "Vegetables", price: 2.99, unit: "piece", image: "🥦", description: "Fresh green broccoli crown, packed with nutrients.", inStock: true, rating: 4.3 },
  { id: "veg-004", name: "Red Bell Pepper", category: "Vegetables", price: 1.79, unit: "piece", image: "🌶️", description: "Sweet red bell pepper, perfect for stir-fry or salads.", inStock: true, rating: 4.2 },
  { id: "veg-005", name: "Baby Spinach", category: "Vegetables", price: 3.49, unit: "pack", image: "🥬", description: "Tender baby spinach leaves, great for salads and smoothies.", inStock: true, rating: 4.6 },
  { id: "veg-006", name: "Sweet Corn", category: "Vegetables", price: 1.29, unit: "piece", image: "🌽", description: "Golden sweet corn on the cob, perfect for grilling.", inStock: true, rating: 4.1 },
  { id: "veg-007", name: "Russet Potatoes", category: "Vegetables", price: 2.99, unit: "kg", image: "🥔", description: "Versatile russet potatoes for baking, mashing, or frying.", inStock: true, rating: 4.3 },

  // ── Dairy ─────────────────────────────────────────────────
  { id: "dairy-001", name: "Whole Milk", category: "Dairy", price: 3.99, unit: "liter", image: "🥛", description: "Farm-fresh whole milk, creamy and nutritious.", inStock: true, rating: 4.7 },
  { id: "dairy-002", name: "Free-Range Eggs", category: "Dairy", price: 5.49, unit: "dozen", image: "🥚", description: "Large free-range eggs from pasture-raised hens.", inStock: true, rating: 4.8 },
  { id: "dairy-003", name: "Cheddar Cheese", category: "Dairy", price: 6.99, unit: "pack", image: "🧀", description: "Sharp aged cheddar cheese, rich and flavorful.", inStock: true, rating: 4.5 },
  { id: "dairy-004", name: "Greek Yogurt", category: "Dairy", price: 4.49, unit: "pack", image: "🍶", description: "Thick and creamy Greek yogurt, high in protein.", inStock: true, rating: 4.6 },
  { id: "dairy-005", name: "Salted Butter", category: "Dairy", price: 4.99, unit: "pack", image: "🧈", description: "Premium salted butter, perfect for cooking and baking.", inStock: true, rating: 4.4 },
  { id: "dairy-006", name: "Fresh Cream", category: "Dairy", price: 3.29, unit: "liter", image: "🍦", description: "Rich heavy cream for whipping, sauces, or coffee.", inStock: false, rating: 4.3 },

  // ── Bakery ────────────────────────────────────────────────
  { id: "bakery-001", name: "Sourdough Loaf", category: "Bakery", price: 5.49, unit: "piece", image: "🍞", description: "Artisan sourdough bread with a crispy crust and tangy flavor.", inStock: true, rating: 4.8 },
  { id: "bakery-002", name: "French Baguette", category: "Bakery", price: 2.99, unit: "piece", image: "🥖", description: "Classic French baguette, golden and crusty.", inStock: true, rating: 4.6 },
  { id: "bakery-003", name: "Chocolate Croissants", category: "Bakery", price: 4.99, unit: "pack", image: "🥐", description: "Flaky butter croissants filled with dark chocolate.", inStock: true, rating: 4.9 },
  { id: "bakery-004", name: "Bagels (6-pack)", category: "Bakery", price: 3.99, unit: "pack", image: "🥯", description: "New York-style bagels, soft inside with a chewy crust.", inStock: true, rating: 4.4 },
  { id: "bakery-005", name: "Blueberry Muffins", category: "Bakery", price: 5.99, unit: "pack", image: "🧁", description: "Moist muffins loaded with fresh blueberries.", inStock: true, rating: 4.5 },
  { id: "bakery-006", name: "Cinnamon Rolls", category: "Bakery", price: 6.49, unit: "pack", image: "🍩", description: "Warm cinnamon rolls with cream cheese frosting.", inStock: true, rating: 4.7 },
  { id: "bakery-007", name: "Whole Wheat Bread", category: "Bakery", price: 3.49, unit: "piece", image: "🍞", description: "Hearty whole wheat bread, sliced and ready to eat.", inStock: true, rating: 4.2 },

  // ── Beverages ─────────────────────────────────────────────
  { id: "bev-001", name: "Orange Juice", category: "Beverages", price: 4.99, unit: "liter", image: "🧃", description: "100% freshly squeezed orange juice, no added sugar.", inStock: true, rating: 4.6 },
  { id: "bev-002", name: "Sparkling Water", category: "Beverages", price: 1.49, unit: "liter", image: "💧", description: "Refreshing sparkling mineral water with fine bubbles.", inStock: true, rating: 4.3 },
  { id: "bev-003", name: "Green Tea (20 bags)", category: "Beverages", price: 3.99, unit: "pack", image: "🍵", description: "Premium Japanese green tea bags, antioxidant-rich.", inStock: true, rating: 4.5 },
  { id: "bev-004", name: "Ground Coffee", category: "Beverages", price: 8.99, unit: "pack", image: "☕", description: "Single-origin medium roast ground coffee, aromatic and smooth.", inStock: true, rating: 4.8 },
  { id: "bev-005", name: "Coconut Water", category: "Beverages", price: 2.99, unit: "liter", image: "🥥", description: "Pure coconut water, naturally hydrating and refreshing.", inStock: true, rating: 4.4 },
  { id: "bev-006", name: "Almond Milk", category: "Beverages", price: 3.49, unit: "liter", image: "🥛", description: "Unsweetened almond milk, dairy-free and delicious.", inStock: true, rating: 4.2 },

  // ── Snacks ────────────────────────────────────────────────
  { id: "snack-001", name: "Mixed Nuts", category: "Snacks", price: 7.99, unit: "pack", image: "🥜", description: "Premium roasted mixed nuts — almonds, cashews, and walnuts.", inStock: true, rating: 4.7 },
  { id: "snack-002", name: "Dark Chocolate Bar", category: "Snacks", price: 3.49, unit: "piece", image: "🍫", description: "70% cacao dark chocolate, rich and smooth.", inStock: true, rating: 4.8 },
  { id: "snack-003", name: "Tortilla Chips", category: "Snacks", price: 3.99, unit: "pack", image: "🌮", description: "Crispy corn tortilla chips, perfect with salsa.", inStock: true, rating: 4.3 },
  { id: "snack-004", name: "Granola Bars", category: "Snacks", price: 4.49, unit: "pack", image: "🍪", description: "Chewy oat granola bars with honey and almonds.", inStock: true, rating: 4.4 },
  { id: "snack-005", name: "Dried Mango Slices", category: "Snacks", price: 5.49, unit: "pack", image: "🥭", description: "Naturally dried mango slices, sweet and chewy.", inStock: true, rating: 4.6 },
  { id: "snack-006", name: "Popcorn (Butter)", category: "Snacks", price: 2.99, unit: "pack", image: "🍿", description: "Movie-theater style butter popcorn, ready to microwave.", inStock: true, rating: 4.1 },
  { id: "snack-007", name: "Rice Crackers", category: "Snacks", price: 3.29, unit: "pack", image: "🍘", description: "Light and crispy rice crackers with soy glaze.", inStock: true, rating: 4.2 },
];

module.exports = products;
