# Task 01 — Online Bookstore with HTML Frames

Design a webpage using HTML frames with navigation, content, and footer frames.

## Files
- `index.html` — frameset (layout definition)
- `nav.html` — top navigation bar
- `content.html` — main book grid
- `footer.html` — footer bar

## How to Run
1. Open the folder in File Explorer
2. Double-click `index.html` → opens in default browser
3. If it doesn't render frames → right-click → Open with → **Firefox**
> Chrome dropped `<frameset>` support. Always use Firefox for frame tasks.

## Structure
```
index.html (frameset: 3 rows)
  ├── nav.html      (60px top bar — bookstore name + links)
  ├── content.html  (main area — book cards grid)
  └── footer.html   (50px footer — copyright)
```

## Key HTML
```html
<frameset rows="60px,*,50px">
  <frame src="nav.html" name="nav"/>
  <frame src="content.html" name="content"/>
  <frame src="footer.html" name="footer"/>
</frameset>
```
