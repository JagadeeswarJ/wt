# Task 28 — XML Schema (XSD)

Create an XML Schema to define and validate the structure of a book catalog XML file.

## Files
- `book_catalog.xsd` — schema definition (the rules)
- `book_catalog.xml` — XML file validated against the schema

## How to Open
Open both files in VS Code or any text editor. No browser needed for XSD.

## Key Concepts

### XSD defines rules for XML:
- What elements are allowed
- What attributes are required
- What data types are valid
- What values are allowed (enum restrictions)

### book_catalog.xsd defines:
| Type | What it does |
|------|-------------|
| `BookType` | Each `<book>` must have title, author, genre, price, availability + id attribute |
| `PriceType` | `<price>` must have a `currency` attribute |
| `AvailabilityType` | Only "In Stock", "Out of Stock", "Pre-Order" allowed |

### book_catalog.xml links to XSD via:
```xml
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="book_catalog.xsd"
```

## Validate in VS Code
Install **XML extension by Red Hat** → it auto-validates XML against XSD and shows errors.
