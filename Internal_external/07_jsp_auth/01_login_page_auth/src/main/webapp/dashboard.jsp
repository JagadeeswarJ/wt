<%@ page language="java" %>
<%
    String user = (String) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>
<html>
<body>
    <h2>Welcome, <%= user %>!</h2>
    <a href="logout">Logout</a>
</body>
</html>