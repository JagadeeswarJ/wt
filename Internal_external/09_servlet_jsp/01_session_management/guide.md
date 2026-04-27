Develop a servlet program to handle session management (login/logout functionality). 
⚙️ STEP 1 — Login Page (login.html)
<!DOCTYPE html>
<html>
<body>

<h2>Login</h2>

<form action="login" method="post">
    Username: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <input type="submit" value="Login">
</form>

</body>
</html>
⚙️ STEP 2 — LoginServlet (Create Session)
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        // simple validation (no DB here)
        if (user.equals("admin") && pass.equals("1234")) {

            HttpSession session = request.getSession();
            session.setAttribute("user", user);

            response.sendRedirect("home");
        } else {
            response.getWriter().println("Invalid Login");
        }
    }
}
Mapping:
@WebServlet("/login")
⚙️ STEP 3 — Protected Servlet (HomeServlet)
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HomeServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.html");
            return;
        }

        String user = (String) session.getAttribute("user");

        PrintWriter out = response.getWriter();
        out.println("<h2>Welcome " + user + "</h2>");
        out.println("<a href='logout'>Logout</a>");
    }
}
Mapping:
@WebServlet("/home")
⚙️ STEP 4 — LogoutServlet (Destroy Session)
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        response.sendRedirect("login.html");
    }
}
Mapping:
@WebServlet("/logout")
⚙️ STEP 5 — Run & Test
Flow:
Open:
http://localhost:8080/BookStoreApp/login.html
Enter:
admin / 1234
Test cases:
Action	Expected Result
Login	Redirect to home
Direct /home without login	Redirect to login
Logout	Session destroyed
Back button after logout	Still blocked