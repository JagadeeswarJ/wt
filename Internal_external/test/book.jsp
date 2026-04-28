<%@page import=java.sql.*%>
<html>
  <head>
    <title>Books</title>
  </head>
  <body>
    <table border="1" cellpadding="6">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Price</th>
      </tr>

<%
Connection conn = null;
Statement smt = null;
ResultSet rs = null;
try{
    Class.from("com.mysql.cj.jdbc.Driver")

    conn  = DriverManager.getConnection(url,username,pass)

    smt = conn.createStatement()
    rs.excuteQuery("Select * from books");
    while(rs.next())
    {

        %>
<tr>
    <td><%=rs.getInt("id")%></td>
</tr>
        
    }
}   
    </table>
  </body>
</html>
