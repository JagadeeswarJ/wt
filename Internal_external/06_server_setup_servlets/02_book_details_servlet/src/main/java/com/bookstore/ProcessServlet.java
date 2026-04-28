package com.bookstore;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/process")
public class ProcessServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            // 1. Read input
            String book = request.getParameter("book");
            double price = Double.parseDouble(request.getParameter("price"));
            int qty = Integer.parseInt(request.getParameter("qty"));

            // 2. Business logic
            double total = price * qty;

            // 3. Dynamic response
            out.println("<html><body style='font-family:Arial'>");
            out.println("<h2>Book Details</h2>");
            out.println("<b>Book Name:</b> " + book + "<br>");
            out.println("<b>Price:</b> " + price + "<br>");
            out.println("<b>Quantity:</b> " + qty + "<br>");
            out.println("<h3>Total Price: " + total + "</h3>");
            out.println("<br><a href='index.html'>Back</a>");
            out.println("</body></html>");

        } catch (Exception e) {
            out.println("<p style='color:red'>Invalid input</p>");
        }
    }
}