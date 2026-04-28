# Task 13 — XML Validation with DTD

Validate XML structure using an inline Document Type Definition (DTD).

## File
- `book_catalog.xml` — XML with inline DTD

## How to Run
1. Open `book_catalog.xml` in **VS Code**
2. Install extension: **XML by Red Hat** (if not already installed)
3. VS Code will auto-validate and underline any DTD violations in red
4. Intentionally break a rule (e.g. remove required attribute) to see the error

## How DTD Works
DTD is declared inside the XML file itself:
```xml
<!DOCTYPE bookCatalog [
  <!ELEMENT bookCatalog (book+)>
  <!ELEMENT book (title, author, genre, price, availability)>
  <!ATTLIST book id ID #REQUIRED>
  <!ELEMENT title (#PCDATA)>
  ...
]>
```

## DTD Rules
| Declaration | Meaning |
|-------------|---------|
| `(book+)` | One or more `<book>` elements |
| `(#PCDATA)` | Text content allowed |
| `ID #REQUIRED` | `id` attribute is mandatory and unique |

## DTD vs XSD
- DTD = simpler, less powerful, built into XML
- XSD = more powerful, supports data types, separate file
