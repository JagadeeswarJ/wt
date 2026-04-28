# Task 29 — XSLT Transformation

Convert XML data into a styled HTML table using XSLT.

## Files
- `books.xml` — XML data (5 books)
- `books.xsl` — XSLT stylesheet (transforms XML → HTML)

## How to Run
1. Open **Firefox**
2. Press **Ctrl+O** → navigate to `books.xml` → Open
3. Firefox reads `<?xml-stylesheet?>`, applies `books.xsl`, renders the HTML table
> Chrome blocks local XSLT — must use Firefox for this task.

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
