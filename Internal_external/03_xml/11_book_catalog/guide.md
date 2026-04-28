# Task 11 — Book Catalog XML

Design an XML structure to represent a catalog of books.

## File
- `book_catalog.xml` — 6 books with structured data

## How to Open
Open in any browser or VS Code. Browser shows the raw XML tree.

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
