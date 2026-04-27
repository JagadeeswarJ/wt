# JSP + JDBC: Display Database Records (Step-by-Step Guide)

## Objective

Create a JSP page that connects to a MySQL database using JDBC and displays records in an HTML table.

---

## Prerequisites

* Apache Tomcat 9 configured
* Java (JDK 8+)
* MySQL running
* Project deployed as a Dynamic Web Project or Maven WAR

---

## STEP 1 — Create Database and Table

Run the following SQL:

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
('Java', 'James', 500),
('Servlets', 'Oracle', 300);
```

---

## STEP 2 — Add MySQL JDBC Driver

### If using Maven

Add dependency in `pom.xml`:

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

Then:

* Right click project → Maven → Update Project

### If NOT using Maven

* Download `mysql-connector-j.jar`
* Place inside:

```
WebContent/WEB-INF/lib/
```

---

## STEP 3 — Configure Deployment Assembly (IMPORTANT)

Ensure:

```
Maven Dependencies → /WEB-INF/lib
```

Steps:

* Right click project → Properties → Deployment Assembly
* Click Add → Java Build Path Entries → Maven Dependencies

---

## STEP 4 — Create JSP File

Create `books.jsp` inside:

```
src/main/webapp/
```

---

## STEP 5 — JSP Code (Copy Below)

```jsp
<%@ page import="java.sql.*" %>
<html>
<head><title>Book List</title></head>
<body>

<h2>Books Available</h2>

<table border="1" cellpadding="6">
<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Author</th>
    <th>Price</th>
</tr>

<%
Connection con = null;
Statement stmt = null;
ResultSet rs = null;

try {
    Class.forName("com.mysql.cj.jdbc.Driver");

    con = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/bookstore?useSSL=false&serverTimezone=UTC",
        "root",
        "password"
    );

    stmt = con.createStatement();
    rs = stmt.executeQuery("SELECT * FROM books");

    while (rs.next()) {
%>
<tr>
    <td><%= rs.getInt("id") %></td>
    <td><%= rs.getString("title") %></td>
    <td><%= rs.getString("author") %></td>
    <td><%= rs.getDouble("price") %></td>
</tr>
<%
    }
} catch(Exception e) {
%>
<tr>
    <td colspan="4">Error: <%= e.getMessage() %></td>
</tr>
<%
} finally {
    try { if (rs != null) rs.close(); } catch(Exception e){}
    try { if (stmt != null) stmt.close(); } catch(Exception e){}
    try { if (con != null) con.close(); } catch(Exception e){}
}
%>

</table>

</body>
</html>
```

---

## STEP 6 — Run the Application

* Right click project → Run on Server
* Open browser:

```
http://localhost:8080/BookStoreApp/books.jsp
```

---

## Expected Output

```
Books Available
ID   Title      Author   Price
1    Java       James    500
2    Servlets   Oracle   300
```

---

## Common Errors & Fixes

| Error                  | Cause             | Fix                       |
| ---------------------- | ----------------- | ------------------------- |
| ClassNotFoundException | Driver not loaded | Check Deployment Assembly |
| Access denied          | Wrong DB password | Update credentials        |
| Unknown database       | DB missing        | Create database           |
| Empty table            | No data           | Insert records            |

---

## Internal Working

```
JSP request
   ↓
Tomcat converts JSP → Servlet
   ↓
JDBC connects to MySQL
   ↓
SQL query executes
   ↓
ResultSet fetched
   ↓
HTML table generated
   ↓
Response sent to browser
```

---

## Key Concept

Deployment Assembly ensures that dependencies (like MySQL driver) are available at runtime in:

```
WEB-INF/lib
```

Without this, Tomcat cannot load JDBC drivers.

---

## End
