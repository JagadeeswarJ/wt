<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <title>Book Catalog - XSLT</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 30px; }
        h1 { color: #2c3e50; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; background: white;
                border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        th { background: #2c3e50; color: white; padding: 12px 15px; text-align: left; }
        td { padding: 11px 15px; border-bottom: 1px solid #eee; font-size: 14px; }
        tr:nth-child(even) td { background: #f8f9fa; }
        .in  { color: #27ae60; font-weight: bold; }
        .out { color: #e74c3c; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Book Catalog (Rendered via XSLT)</h1>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Price (&#8377;)</th>
          <th>Availability</th>
        </tr>
        <xsl:for-each select="bookCatalog/book">
          <tr>
            <td><xsl:value-of select="title"/></td>
            <td><xsl:value-of select="author"/></td>
            <td><xsl:value-of select="genre"/></td>
            <td>&#8377;<xsl:value-of select="price"/></td>
            <td>
              <xsl:choose>
                <xsl:when test="availability = 'In Stock'">
                  <span class="in"><xsl:value-of select="availability"/></span>
                </xsl:when>
                <xsl:otherwise>
                  <span class="out"><xsl:value-of select="availability"/></span>
                </xsl:otherwise>
              </xsl:choose>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
