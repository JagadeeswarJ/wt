<%@ page language="java" %>
<%
    String user = (String) session.getAttribute("user");
    if (user != null) {
    	session.setAttribute("user", user);
        response.sendRedirect("dashboard.jsp");
        return;
    }
%>
<html>
<head><title>Login</title></head>
<body>

<h2>Login Page</h2>

<form action="login" method="post">
    Username: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <input type="submit" value="Login">
</form>

</body>
</html>