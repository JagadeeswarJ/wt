<%@ page import="java.sql.*" %>
<html>
<head>
  <title>Book List</title>
  <style>
    body { font-family: Arial; padding: 40px; background: #f0f0f0; }
    h2 { color: #2c3e50; }
    table { border-collapse: collapse; width: 600px; background: white; }
    th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
    th { background: #2c3e50; color: white; }
    tr:nth-child(even) { background: #f9f9f9; }
    .error { color: red; font-weight: bold; }
  </style>
</head>
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
    out.println("<!-- DEBUG: Attempting to load driver... -->");
    
    // 1. Load driver
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        out.println("<!-- DEBUG: Driver loaded successfully -->");
    } catch(ClassNotFoundException cnfe) {
        out.println("<tr><td colspan='4' class='error'><strong>❌ DRIVER NOT FOUND:</strong> " + cnfe.getMessage() + "</td></tr>");
        throw cnfe;
    }

    // 2. Connect DB
    out.println("<!-- DEBUG: Connecting to database... -->");
    Connection con = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/bookstore",
        "root",
        "password"
    );
    out.println("<!-- DEBUG: Connected successfully -->");

    // 3. Query
    Statement stmt = con.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM books");
    out.println("<!-- DEBUG: Query executed -->");

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

    rs.close();
    stmt.close();
    con.close();
} catch(Exception e) {
    out.println("<tr><td colspan='4' class='error'>");
    out.println("<strong>❌ ERROR: " + e.getClass().getSimpleName() + "</strong><br>");
    out.println("Message: <code>" + e.getMessage() + "</code><br>");
    e.printStackTrace(out);
    out.println("</td></tr>");
}
%>

</table>

</body>
</html>
