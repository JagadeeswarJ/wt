# Week 8 — Servlet to Display Book Details from Database

Develop a servlet that retrieves book information from a database and displays it.

---

## Step 1 — Create MySQL Database

```sql
CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author VARCHAR(100),
    price DOUBLE
);

INSERT INTO books (title, author, price) VALUES
('The Alchemist', 'Paulo Coelho', 299),
('Atomic Habits', 'James Clear', 399),
('Sapiens', 'Yuval Noah Harari', 499);
```

---

## Step 2 — Create Maven Dynamic Web Project in Eclipse

1. **File → New → Dynamic Web Project**
2. Fill in:
   - **Project name:** `BookStoreApp`
   - **Target runtime:** Apache Tomcat 9.x
3. Click **Next → Next**
4. Check **"Generate web.xml deployment descriptor"**
5. Click **Finish**

---

## Step 3 — Configure pom.xml

Open `pom.xml` → click the **pom.xml** tab → replace all content with:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <groupId>com.bookstore</groupId>
  <artifactId>BookStoreApp</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>war</packaging>

  <properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>

  <dependencies>

    <!-- Servlet API (Tomcat 9 uses javax) -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
    </dependency>

    <!-- MySQL JDBC Driver -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
    </dependency>

  </dependencies>

  <build>
    <finalName>BookStoreApp</finalName>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.4.0</version>
      </plugin>
    </plugins>
  </build>

</project>
```

**Save (Ctrl+S)** — Eclipse downloads dependencies automatically.

---

## Step 4 — Create Package and Servlet

1. Right-click `src/main/java` → **New → Package** → name it `com.bookstore`
2. Right-click `com.bookstore` → **New → Class** → name it `BookServlet`

### BookServlet.java

```java
package com.bookstore;

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/books")
public class BookServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body style='font-family:Arial;padding:30px'>");
        out.println("<h2>Book List</h2>");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/bookstore", "root", "root");

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM books");

            out.println("<table border='1' cellpadding='8'>");
            out.println("<tr><th>ID</th><th>Title</th><th>Author</th><th>Price</th></tr>");

            while (rs.next()) {
                out.println("<tr>");
                out.println("<td>" + rs.getInt("id") + "</td>");
                out.println("<td>" + rs.getString("title") + "</td>");
                out.println("<td>" + rs.getString("author") + "</td>");
                out.println("<td>Rs. " + rs.getDouble("price") + "</td>");
                out.println("</tr>");
            }

            out.println("</table>");
            con.close();

        } catch (Exception e) {
            out.println("<p>Error: " + e.getMessage() + "</p>");
        }

        out.println("</body></html>");
    }
}
```

---

## Step 5 — Run

Right-click project → **Run As → Run on Server** → select Tomcat 9 → Finish

Open browser:
```
http://localhost:8080/BookStoreApp/books
```

---

## Project Structure

```
BookStoreApp/
  src/main/java/com/bookstore/
    BookServlet.java
  src/main/webapp/
    WEB-INF/
      web.xml
  pom.xml
```
