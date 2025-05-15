// === Shared Cart Logic ===
const fruits = [
  { id: 1, name: "Apple", category: "Citrus", price: 2.99, image: "https://placehold.co/300x200?text=Apple " },
  { id: 2, name: "Banana", category: "Tropical", price: 1.49, image: "https://placehold.co/300x200?text=Banana " },
  { id: 3, name: "Orange", category: "Citrus", price: 3.29, image: "https://placehold.co/300x200?text=Orange " },
  { id: 4, name: "Mango", category: "Tropical", price: 4.99, image: "https://placehold.co/300x200?text=Mango " },
  { id: 5, name: "Strawberry", category: "Berries", price: 5.99, image: "https://placehold.co/300x200?text=Strawberry " },
  { id: 6, name: "Blueberry", category: "Berries", price: 6.49, image: "https://placehold.co/300x200?text=Blueberry " },
  { id: 7, name: "Pineapple", category: "Tropical", price: 3.99, image: "https://placehold.co/300x200?text=Pineapple " },
  { id: 8, name: "Lemon", category: "Citrus", price: 2.49, image: "https://placehold.co/300x200?text=Lemon " },
  { id: 9, name: "Grapes", category: "Berries", price: 4.29, image: "https://placehold.co/300x200?text=Grapes " }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Only run main product logic if NOT on checkout or summary page
if (!document.body.id || !["checkout-page", "summary-page"].includes(document.body.id)) {

  const productsGrid = document.getElementById("productsGrid");
  const categoryButtonsContainer = document.getElementById("categoryButtons");
  const searchInput = document.getElementById("searchInput");
  const notification = document.getElementById("notification");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartIcon = document.getElementById("cartIcon");
  const closeCart = document.getElementById("closeCart");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartCount = document.getElementById("cartCount");

  let activeCategory = "All";

  // Initialize categories
  function initCategories() {
    const categories = ["All", ...new Set(fruits.map(f => f.category))];
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "category-button";
      if (cat === "All") btn.classList.add("active");
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        activeCategory = cat;
        document.querySelectorAll(".category-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts();
      });
      categoryButtonsContainer.appendChild(btn);
    });
  }

  // Render Products
  function renderProducts() {
    const query = searchInput.value.toLowerCase();
    const filtered = fruits.filter(f =>
      (activeCategory === "All" || f.category === activeCategory) &&
      f.name.toLowerCase().includes(query)
    );

    productsGrid.innerHTML = "";
    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #9ca3af;">
          No fruits found.
        </div>`;
      return;
    }

    filtered.forEach(fruit => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          <img src="${fruit.image}" alt="${fruit.name}">
        </div>
        <div class="product-info">
          <div class="product-name">${fruit.name}</div>
          <div class="product-category">${fruit.category}</div>
          <div class="product-price">$${fruit.price.toFixed(2)}</div>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      `;
      card.querySelector(".add-to-cart-btn").addEventListener("click", () => addToCart(fruit));
      productsGrid.appendChild(card);
    });
  }

  // Add to Cart
  function addToCart(fruit) {
    const item = cart.find(i => i.id === fruit.id);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ ...fruit, quantity: 1 });
    }
    showNotification(`${fruit.name} added to cart`);
    updateCartUI();
    saveCartToLocalStorage();
  }

  // Show Notification
  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 2000);
  }

  // Update Cart UI
  function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = "$" + cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    checkoutBtn.disabled = cart.length === 0;

    cartItemsList.innerHTML = "";
    cartEmpty.style.display = cart.length === 0 ? "block" : "none";

    cart.forEach(item => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn minus">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus">+</button>
          <span class="remove-btn">×</span>
        </div>
      `;
      li.querySelector(".minus").addEventListener("click", () => {
        if (item.quantity > 1) item.quantity--;
        else removeCartItem(item.id);
        updateCartUI();
        saveCartToLocalStorage();
      });
      li.querySelector(".plus").addEventListener("click", () => {
        item.quantity++;
        updateCartUI();
        saveCartToLocalStorage();
      });
      li.querySelector(".remove-btn").addEventListener("click", () => {
        removeCartItem(item.id);
        updateCartUI();
        saveCartToLocalStorage();
      });
      cartItemsList.appendChild(li);
    });
  }

  // Remove from Cart
  function removeCartItem(id) {
    cart = cart.filter(i => i.id !== id);
  }

  // Open/Close Cart
  cartIcon.addEventListener("click", () => cartOverlay.classList.add("open"));
  closeCart.addEventListener("click", () => cartOverlay.classList.remove("open"));

  // Search
  searchInput.addEventListener("input", renderProducts);

  // Checkout Button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return;
      window.location.href = "checkout.html";
    });
  }

  // Initial Setup
  initCategories();
  renderProducts();
  updateCartUI();

} else if (document.body.id === "checkout-page") {

  // === Checkout Page Logic ===
  document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderOrderSummary() {
      const summaryItems = document.getElementById("summaryItems");
      const summaryTotal = document.getElementById("summaryTotal");

      if (!summaryItems || !summaryTotal) {
        console.error("Required DOM elements missing in checkout.html");
        return;
      }

      let total = 0;

      if (cart.length === 0) {
        summaryItems.innerHTML = "<p>Your cart is empty.</p>";
        summaryTotal.textContent = "Total: $0.00";
        return;
      }

      summaryItems.innerHTML = ""; // Clear previous

      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `
          <span>${item.name} x ${item.quantity}</span>
          <span>$${itemTotal.toFixed(2)}</span>
        `;
        summaryItems.appendChild(div);
      });

      summaryTotal.textContent = "Total: $" + total.toFixed(2);
    }

    // Handle form submission
    const form = document.getElementById("checkoutForm");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const country = document.getElementById("country").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        if (!name || !email || !address || !city || !zip || !country || !paymentMethod) {
          alert("Please fill out all fields.");
          return;
        }

        window.location.href = "order-summary.html"; // Redirect first
          setTimeout(() => {
            localStorage.removeItem("cart"); // Then clear cart after redirect
          }, 1000);
      });
    }

    // Initialize
    renderOrderSummary();
  });

} else if (document.body.id === "summary-page") {
  document.addEventListener("DOMContentLoaded", function () {
    const rawCart = localStorage.getItem("cart");
    console.log("Raw cart data:", rawCart); // Debug: see what's stored
    const cart = rawCart ? JSON.parse(rawCart) : [];
    const summaryDetails = document.getElementById("summaryDetails");

    if (!summaryDetails) {
      console.error("summaryDetails element NOT FOUND");
      return;
    }

    if (cart.length === 0) {
      summaryDetails.innerHTML = "<p>No items were found in your order.</p>";
      return;
    }

    let total = 0;
    const summaryHTML = `
      <ul style="list-style: none; padding: 0; text-align: center; margin-bottom: 1.5rem;">
        ${cart.map(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          return `
            <li style="padding: 0.5rem 0;">
              ${item.name} x ${item.quantity} — $${itemTotal.toFixed(2)}
            </li>`;
        }).join('')}
      </ul>
      <div class="order-total" style="font-size: 1.25rem; font-weight: bold; margin-top: 1rem;">
        Total: $${total.toFixed(2)}
      </div>
    `;
    summaryDetails.innerHTML = summaryHTML;
    localStorage.removeItem("cart");
  });
}

// === Dark Mode Toggle Logic ===
const darkModeToggle = document.getElementById("darkModeToggle");

// Check if user previously set a preference
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Apply dark mode if needed
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  if (darkModeToggle) darkModeToggle.textContent = "☀️ Light Mode";
}

// Toggle dark mode on button click
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isInDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isInDarkMode);
    darkModeToggle.textContent = isInDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}