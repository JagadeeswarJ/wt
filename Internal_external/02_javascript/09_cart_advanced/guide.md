# Task 09 — Advanced Shopping Cart (Remove + Total)

Shopping cart with remove functionality and total price calculation.

## File
- `index.html` — book grid + cart with remove buttons

## How to Run
1. Double-click `index.html` → opens in any browser
2. Add books → see cart with total price
3. Click Remove → item removed, total updates
4. Click Checkout → alert shows total, cart clears

## How It Works
- Each cart item gets a unique `id: Date.now() + Math.random()`
- `removeFromCart(id)` filters cart array by uid to remove that item
- Total calculated via `cart.reduce((sum, b) => sum + b.price, 0)`
- Checkout button alerts total and clears cart
