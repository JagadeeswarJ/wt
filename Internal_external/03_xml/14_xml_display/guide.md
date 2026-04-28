# Task 14 — Display XML Data in Browser via JavaScript

Parse and display XML data in an HTML table using JavaScript.

## Files
- `index.html` — HTML page + JavaScript to parse and display XML
- `books.xml` — XML data source

## How to Open
Open `index.html` in a browser.
> Note: Chrome blocks local file fetch. Use Firefox, or run via a local server (VS Code Live Server extension).

## How It Works
1. `fetch('books.xml')` tries to load the XML file
2. If fetch fails (Chrome local restriction) → falls back to inline XML string
3. `DOMParser` parses the XML string into a DOM
4. `getElementsByTagName('book')` loops over books
5. Builds an HTML table dynamically and injects into the page

## Key Code
```javascript
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");
const books = xmlDoc.getElementsByTagName("book");
```
