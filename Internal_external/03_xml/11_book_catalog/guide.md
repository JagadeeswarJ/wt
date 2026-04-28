# Task 11 — Book Catalog XML

Design an XML structure to represent a catalog of books.

## File
- `book_catalog.xml` — 6 books with structured data

## How to Run
1. Double-click `book_catalog.xml` → opens in browser as a collapsible XML tree
2. Or open in VS Code to read/edit the structure
3. No compilation or server needed

## Structure
```xml
<bookCatalog>
  <book id="B001">
    <title>...</title>
    <author>...</author>
    <genre>...</genre>
    <price currency="INR">...</price>
    <availability>...</availability>
  </book>
</bookCatalog>
```

## Key Points
- `id` is an attribute on `<book>`
- `currency` is an attribute on `<price>`
- Well-formed XML: all tags properly closed and nested
