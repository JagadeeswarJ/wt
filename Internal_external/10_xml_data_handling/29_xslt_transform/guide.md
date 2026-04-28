# Task 29 — XSLT Transformation

Convert XML data into a styled HTML table using XSLT.

## Files
- `books.xml` — XML data (5 books)
- `books.xsl` — XSLT stylesheet (transforms XML → HTML)

## How to Open
Open `books.xml` in **Firefox** (Chrome blocks local XSLT).
Firefox reads the `<?xml-stylesheet?>` instruction and applies `books.xsl` automatically.

## Key Concepts

### books.xml links to the stylesheet via:
```xml
<?xml-stylesheet type="text/xsl" href="books.xsl"?>
```

### books.xsl uses:
| Tag | Purpose |
|-----|---------|
| `<xsl:template match="/">` | Entry point — matches root of XML |
| `<xsl:for-each select="bookCatalog/book">` | Loop over each book |
| `<xsl:value-of select="title"/>` | Print value of an element |
| `<xsl:number/>` | Auto row number |
| `<xsl:choose>/<xsl:when>` | If/else — green for In Stock, red for Out of Stock |

## Output
A styled HTML table with columns: #, Title, Author, Genre, Price, Availability
