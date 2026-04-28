# Task 08 — Shopping Cart

Add books to a cart and view cart contents using JavaScript.

## File
- `index.html` — book grid + cart panel

## How to Run
1. Double-click `index.html` → opens in any browser
2. Click "Add to Cart" on any book → cart panel updates
3. Refresh page → cart resets (no persistence)

## How It Works
- `cart[]` array stores added books
- `addToCart(i)` pushes book object into array, calls `renderCart()`
- `renderCart()` updates the cart list and badge count in the UI
- No localStorage — cart resets on page refresh
