Restrict access to certain pages based on user login status. 
⚙️ STEP 1 — Modify LoginServlet (add session)

Update your Q18 servlet:

import javax.servlet.http.HttpSession;

if (rs.next()) {
    // create session
    HttpSession session = request.getSession();
    session.setAttribute("user", user);

    response.sendRedirect("dashboard.jsp");
} else {
    response.sendRedirect("error.jsp");
}
⚙️ STEP 2 — Create Protected Page (dashboard.jsp)
<%@ page language="java" %>
<%
    String user = (String) session.getAttribute("user");

    if (user == null) {
        response.sendRedirect("login.jsp");
    }
%>

<html>
<body>

<h2>Welcome <%= user %></h2>
<a href="logout">Logout</a>

</body>
</html>
⚙️ STEP 3 — Create Logout Servlet
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate(); // destroy session
        }

        response.sendRedirect("login.jsp");
    }
}
Mapping:
@WebServlet("/logout")
⚙️ STEP 4 — Test Flow
Case 1 (correct)
login → dashboard → works
Case 2 (direct access)
open dashboard.jsp directly
→ redirected to login.jsp
Case 3 (logout)
click logout → session destroyed → back to login