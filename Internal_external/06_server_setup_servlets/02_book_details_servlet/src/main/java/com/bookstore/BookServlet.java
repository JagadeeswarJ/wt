package com.bookstore;

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/books")
public class BookServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<h2>Book List</h2>");

        try {
            // 1. Load driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. Connect DB
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/bookstore",
                "root",
                "root"
            );

            // 3. Query
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM books");

            // 4. Display
            while (rs.next()) {
                out.println("<p>");
                out.println("ID: " + rs.getInt("id") + "<br>");
                out.println("Title: " + rs.getString("title") + "<br>");
                out.println("Author: " + rs.getString("author") + "<br>");
                out.println("Price: " + rs.getDouble("price"));
                out.println("</p><hr>");
            }

            con.close();

        } catch (Exception e) {
            out.println("Error: " + e.getMessage());
        }
    }
}