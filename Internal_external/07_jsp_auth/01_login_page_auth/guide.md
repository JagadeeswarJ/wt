Develop a Login Page using JSP and Implement User Authentication

⚙️ STEP 1 — Create Users Table (MySQL)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50)
);

INSERT INTO users (username, password) VALUES
('admin', '1234'),
('user1', 'pass');
⚙️ STEP 2 — Create login.jsp

Place inside WebContent

<%@ page language="java" %>
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
⚙️ STEP 3 — Create LoginServlet.java
import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/bookstore",
                "root",
                "password"
            );

            PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM users WHERE username=? AND password=?"
            );

            ps.setString(1, user);
            ps.setString(2, pass);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                // valid login
                response.sendRedirect("success.jsp");
            } else {
                // invalid login
                response.sendRedirect("error.jsp");
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
⚙️ STEP 4 — URL Mapping
@WebServlet("/login")
⚙️ STEP 5 — Create success.jsp
<html>
<body>
<h2>Login Successful!</h2>
Welcome user!
</body>
</html>
⚙️ STEP 6 — Create error.jsp
<html>
<body>
<h2>Invalid Username or Password</h2>
<a href="login.jsp">Try Again</a>
</body>
</html>
⚙️ STEP 7 — Run

Open:

http://localhost:8080/BookStoreApp/login.jsp

Test:

admin / 1234 → success
wrong → error