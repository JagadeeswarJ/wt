# Task 02 — Frameset Layout with Category Navigation

Multi-frame layout with left sidebar navigation and content area.

## Files
- `index.html` — nested frameset
- `nav.html` — left sidebar with category links
- `header.html` — top header bar
- `home.html` — default content
- `book_fiction.html`, `book_science.html`, `book_history.html`, `book_selfhelp.html` — category pages

## How to Run
1. Double-click `index.html` → opens in browser
2. Must use **Firefox** — Chrome does not support `<frameset>`
3. Left sidebar should show categories, clicking them loads content on the right

## Structure
```
index.html (frameset: cols="200px,*")
  ├── nav.html          (left sidebar — category links)
  └── nested frameset (rows="80px,*")
        ├── header.html (top bar)
        └── content frame (loads category pages)
```

## Key Concept
Links in `nav.html` use `target="content"` to load pages into the content frame:
```html
<a href="book_fiction.html" target="content">Fiction</a>
```
