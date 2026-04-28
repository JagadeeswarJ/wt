# Task 07 — Dynamic Content Loading

Load book details dynamically without page reload using JavaScript DOM manipulation.

## File
- `index.html` — sidebar links + detail panel

## How to Run
1. Double-click `index.html` → opens in any browser
2. Click a book title in the sidebar → details load on the right
3. No page reload happens

## How It Works
- Books stored as a JavaScript object (title, author, price, genre, description)
- Sidebar links call `showBook(key, el)` on click
- Function updates `#detail` div innerHTML with book info
- No page reload — pure DOM manipulation
