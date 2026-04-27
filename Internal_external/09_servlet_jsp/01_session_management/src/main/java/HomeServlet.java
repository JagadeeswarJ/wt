import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/home")
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
        out.println("<html><body style='font-family:Arial;padding:40px'>");
        out.println("<h2>Welcome, " + user + "!</h2>");
        out.println("<p>You are logged in.</p>");
        out.println("<a href='logout'>Logout</a>");
        out.println("</body></html>");
    }
}