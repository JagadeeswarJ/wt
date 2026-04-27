 Create a JSP page to display database records using JDBC connectivity. 
⚙️ STEP 1 — Ensure Database Exists (MySQL)
CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author VARCHAR(100),
    price DOUBLE
);

INSERT INTO books (title, author, price) VALUES
('Java', 'James', 500),
('Servlets', 'Oracle', 300);
⚙️ STEP 2 — Add JDBC Driver
Add mysql-connector-j.jar to project:
Build Path → Add External JAR
⚙️ STEP 3 — Create books.jsp

Place inside WebContent

<%@ page import="java.sql.*" %>
<html>
<head><title>Book List</title></head>
<body>

<h2>Books Available</h2>

<table border="1">
<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Author</th>
    <th>Price</th>
</tr>

<%
try {
    // 1. Load driver
    Class.forName("com.mysql.cj.jdbc.Driver");

    // 2. Connect DB
    Connection con = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/bookstore",
        "root",
        "password"
    );

    // 3. Query
    Statement stmt = con.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM books");

    // 4. Loop and display
    while(rs.next()) {
%>
<tr>
    <td><%= rs.getInt("id") %></td>
    <td><%= rs.getString("title") %></td>
    <td><%= rs.getString("author") %></td>
    <td><%= rs.getDouble("price") %></td>
</tr>
<%
    }

    con.close();
} catch(Exception e) {
    out.println("Error: " + e.getMessage());
}
%>

</table>

</body>
</html>
⚙️ STEP 4 — Run

Open:

http://localhost:8080/BookStoreApp/books.jsp
🧠 What’s happening internally
JSP requested
    ↓
Converted to Servlet (by Tomcat)
    ↓
JDBC executes query
    ↓
ResultSet fetched
    ↓
HTML generated dynamically
    ↓
Response sent to browser