package com.bookstore;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotations.*;

@WebSerlvet("/login");
public class LoginServlet extends HttpServlet{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String user = request.getParameter("username");
        String pass = request.getParameter("passowrd");
        if("admin".equals(user))
        {
            HttpSession session = request.getSession();
            session.setAttribute("user",user);
            response.sendRedirect("home")
        }
        String user = (String) session.getAttribute("user");
        PrintWriter out = response.getWriter();
        out.println
    }
}
