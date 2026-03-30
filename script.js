// Global state
let products = [];
let filteredProducts = [];
let cartCount = 0;
let currentFilters = {
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sort: 'default'
};

// DOM Elements
const elements = {
  searchInput: document.getElementById('searchInput'),
  cartBtn: document.getElementById('cartBtn'),
  cartCount: document.getElementById('cartCount'),
  tabBtns: document.querySelectorAll('.tab-btn'),
  priceRange: document.getElementById('priceRange'),
  minPrice: document.getElementById('minPrice'),
  maxPrice: document.getElementById('maxPrice'),
  ratingFilters: document.querySelectorAll('.rating-filters input[type="checkbox"]'),
  sortSelect: document.getElementById('sortSelect'),
  productsGrid: document.getElementById('productsGrid'),
  productsTitle: document.getElementById('productsTitle'),
  productsCount: document.getElementById('productsCount'),
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toastMessage')
};

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Load products from JSON
function loadProducts() {
  products = [
    {"id":1,"name":"Wireless Bluetooth Headphones","category":"Electronics","price":89.99,"rating":4.5,"image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"},
    {"id":2,"name":"Smartphone Pro Max","category":"Electronics","price":999.00,"rating":4.8,"image":"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"},
    {"id":3,"name":"4K Gaming Monitor","category":"Electronics","price":349.99,"rating":4.7,"image":"https://images.unsplash.com/photo-1517437819565-379e550365b8?w=400&h=400&fit=crop"},
    {"id":4,"name":"Wireless Mouse","category":"Electronics","price":29.99,"rating":4.2,"image":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"},
    {"id":5,"name":"Smart Watch Ultra","category":"Electronics","price":399.00,"rating":4.6,"image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"},
    {"id":6,"name":"Tablet 12-inch","category":"Electronics","price":599.99,"rating":4.4,"image":"https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop"},
    {"id":7,"name":"Laptop Air","category":"Electronics","price":1299.00,"rating":4.9,"image":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"},
    {"id":8,"name":"Noise Cancelling Earbuds","category":"Electronics","price":149.99,"rating":4.3,"image":"https://images.unsplash.com/photo-1614224932442-1bfdf3d48e8c?w=400&h=400&fit=crop"},
    {"id":9,"name":"Cotton T-Shirt","category":"Fashion","price":24.99,"rating":4.1,"image":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"},
    {"id":10,"name":"Leather Jacket","category":"Fashion","price":199.00,"rating":4.7,"image":"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"},
    {"id":11,"name":"Denim Jeans","category":"Fashion","price":59.99,"rating":4.4,"image":"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"},
    {"id":12,"name":"Sneakers High Top","category":"Fashion","price":89.99,"rating":4.6,"image":"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"},
    {"id":13,"name":"Summer Dress","category":"Fashion","price":45.00,"rating":4.2,"image":"https://images.unsplash.com/photo-1487222474744-895d75a8e1e0?w=400&h=400&fit=crop"},
    {"id":14,"name":"Wool Sweater","category":"Fashion","price":79.99,"rating":4.5,"image":"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop"},
    {"id":15,"name":"Refrigerator Smart","category":"Home Appliances","price":899.99,"rating":4.8,"image":"https://images.unsplash.com/photo-1583091544715-53d885a77e44?w=400&h=400&fit=crop"},
    {"id":16,"name":"Microwave Oven","category":"Home Appliances","price":179.99,"rating":4.3,"image":"https://images.unsplash.com/photo-1584708816134-ef7d7019d8d3?w=400&h=400&fit=crop"},
    {"id":17,"name":"Vacuum Cleaner Robot","category":"Home Appliances","price":299.00,"rating":4.6,"image":"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"},
    {"id":18,"name":"Air Conditioner","category":"Home Appliances","price":499.99,"rating":4.4,"image":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop"},
    {"id":19,"name":"Modern Fiction Novel","category":"Books","price":19.99,"rating":4.7,"image":"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"},
    {"id":20,"name":"Self-Help Guide","category":"Books","price":14.99,"rating":4.5,"image":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"},
    {"id":21,"name":"Programming Cookbook","category":"Books","price":39.99,"rating":4.9,"image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"},
    {"id":22,"name":"Mystery Thriller","category":"Books","price":22.99,"rating":4.3,"image":"https://images.unsplash.com/photo-1543002588-bfa74002ed7a?w=400&h=400&fit=crop"},
    {"id":23,"name":"Coffee Maker Pro","category":"Home Appliances","price":129.99,"rating":4.6,"image":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop"},
    {"id":24,"name":"Designer Handbag","category":"Fashion","price":249.00,"rating":4.8,"image":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"}
  ];
  filteredProducts = [...products];
  renderProducts();
}

async function init() {
  updateCartCount();
  loadProducts();
  initEventListeners();
}

// Filter products based on current state
function applyFilters() {
  filteredProducts = products.filter(product => {
    // Category filter
    if (currentFilters.category !== 'all' && product.category !== currentFilters.category) {
      return false;
    }

    // Price filter
    if (product.price < currentFilters.minPrice || product.price > currentFilters.maxPrice) {
      return false;
    }

    // Rating filter
    if (product.rating < currentFilters.minRating) {
      return false;
    }

    return true;
  });

  // Apply search
  const searchTerm = elements.searchInput.value.toLowerCase().trim();
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (currentFilters.sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating-high':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  renderProducts();
}

// Render products to grid
function renderProducts() {
  const hasProducts = filteredProducts.length > 0;
  
  if (!hasProducts) {
    elements.productsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    `;
  } else {
    elements.productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
  }

  // Update title and count
  const categoryName = currentFilters.category === 'all' ? 'Featured Products' : `${currentFilters.category}`;
  elements.productsTitle.textContent = `${categoryName}`;
  elements.productsCount.textContent = `${filteredProducts.length} products`;

  // Remove skeleton class after first render
  elements.productsGrid.classList.remove('skeleton-loading');
}

// Create product card HTML
function createProductCard(product) {
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-rating">
          <span class="rating-stars">${stars}</span>
          <span class="rating-value">(${product.rating})</span>
        </div>
        <button class="add-to-cart-btn" data-id="${product.id}">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Update cart count
function updateCartCount() {
  cartCount = parseInt(localStorage.getItem('cartCount') || '0');
  elements.cartCount.textContent = cartCount;
}

// Show toast notification
function showToast(message = 'Product added to cart!') {
  elements.toastMessage.textContent = message;
  elements.toast.classList.add('show');
  
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

// Event Listeners
function initEventListeners() {
  // Category tabs
  elements.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilters.category = btn.dataset.category;
      applyFilters();
    });
  });

  // Price range slider
  elements.priceRange.addEventListener('input', (e) => {
    currentFilters.maxPrice = parseFloat(e.target.value);
    elements.maxPrice.textContent = `$${currentFilters.maxPrice}`;
    elements.minPrice.textContent = '$0';
    currentFilters.minPrice = 0;
    applyFilters();
  });

  // Rating filters
  elements.ratingFilters.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      currentFilters.minRating = Math.max(
        ...Array.from(elements.ratingFilters)
          .filter(cb => cb.checked)
          .map(cb => parseInt(cb.value))
      ) || 0;
      applyFilters();
    });
  });

  // Sort select
  elements.sortSelect.addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    applyFilters();
  });

  // Search - debounced
  const debouncedSearch = debounce(() => applyFilters(), 300);
  elements.searchInput.addEventListener('input', debouncedSearch);

  // Cart buttons (delegated)
  elements.productsGrid.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
      const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.id);
      cartCount++;
      localStorage.setItem('cartCount', cartCount);
      updateCartCount();
      showToast();
    }
  });

  // Cart button click (future enhancement)
  elements.cartBtn.addEventListener('click', () => {
    alert(`View cart: ${cartCount} items`);
  });
}

// Initialize app
async function init() {
  updateCartCount();
  await loadProducts();
  initEventListeners();
}

// Start when DOM loaded
document.addEventListener('DOMContentLoaded', init);

// Intersection Observer for animations (optional enhancement)
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

