# FreshFruit Market 🛒

FreshFruit Market is a demo web application for a fruit store. It allows users to browse fruits, search and filter by category, add items to a shopping cart, and proceed to checkout—all with a modern, responsive interface.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [How to Use](#how-to-use)
- [Tech Stack](#tech-stack)
- [Notes](#notes)
- [Screenshots](#screenshots)

---

## Features

- **Product Catalog**: Browse a variety of fruits, each with images, names, and prices.
- **Search & Filter**: Instantly search fruits by name or filter by category.
- **Shopping Cart**: Add, remove, and update quantities of products in a real-time cart sidebar.
- **Checkout**: Review your cart and proceed to checkout (demo only, no real payment).
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Notifications**: Get instant feedback for actions like adding to cart.

---

## Project Structure

```
project-demo-store/
│
├── index.html         # Main page (product listing, search, cart)
├── checkout.html      # Checkout form (customer info, payment)
├── order-summary.html # Order confirmation and summary
├── style.css          # All styles, including dark mode
├── script.js          # Main JavaScript logic
└── .vscode/           # VS Code settings (optional)
```

---

## How It Works

### 1. **Header**
- **Logo**: "FreshFruit Market"
- **Search Box**: Type to search fruits by name.
- **Cart Icon**: Shows current cart item count; click to open cart sidebar.
- **Dark Mode Toggle**: Switch between light and dark themes.

### 2. **Categories**
- Category buttons are generated dynamically.
- Click a category to filter products.

### 3. **Product Grid**
- Displays all fruits or filtered results.
- Each product shows image, name, price, and "Add to Cart" button.

### 4. **Cart Sidebar**
- Slide-out panel showing cart items, quantities, and total price.
- Remove items or adjust quantities directly.
- "Checkout" button (disabled if cart is empty).

### 5. **Footer**
- Simple copyright.

---

## How to Use

1. **Open the App**  
   Open `index.html` in your browser (or use Live Server in VS Code).

2. **Browse & Search**  
   - Browse all fruits or use the search box.
   - Filter by category using the buttons.

3. **Add to Cart**  
   - Click "Add to Cart" on any product.
   - The cart icon updates with the number of items.

4. **View Cart**  
   - Click the cart icon to open the cart sidebar.
   - Adjust quantities or remove items as needed.

5. **Checkout**  
   - Click "Checkout" to go to the checkout page.
   - Fill in your details and place your order (demo only).

6. **Order Summary**  
   - After checkout, view a summary of your order.

---

## Tech Stack

- **HTML5** — Structure and layout
- **CSS3** — Styling and responsive design (including dark mode)
- **JavaScript (ES6+)** — All interactivity, cart logic, filtering, and notifications
- **LocalStorage** — Stores cart data in the browser

---

## Notes

- All data is stored locally in the browser (no backend/server).
- No real payment processing—this is a demo project.
- You can reset the cart by clearing your browser's local storage.

---

© 2025 FreshFruit Market. All rights reserved.

---

