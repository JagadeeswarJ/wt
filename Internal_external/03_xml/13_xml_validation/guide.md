# Task 13 — XML Validation with DTD

Validate XML structure using an inline Document Type Definition (DTD).

## File
- `book_catalog.xml` — XML with inline DTD

## How to Open
Open in VS Code (with XML extension) to see validation.

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
