STEP 1 — Create Database (MySQL)
    Create DB + Table
    CREATE DATABASE bookstore;

    USE bookstore;

    CREATE TABLE books (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100),
        author VARCHAR(100),
        price DOUBLE
    );

    INSERT INTO books (title, author, price) VALUES
    ('Java Basics', 'James Gosling', 500),
    ('Servlet Guide', 'Oracle Docs', 300),
    ('Web Dev', 'MDN', 400);

STEP 2 — Create Dynamic Web Project in Eclipse IDE
    File → New → Dynamic Web Project
    Name: BookStoreApp
    Target Runtime: Select your Apache Tomcat
    Finish

STEP 3 — Add MySQL Connector (JDBC Driver)

    Download:

    mysql-connector-j.jar

    Add to project:

    Right click project → Build Path → Add External JAR

STEP 4 — Create Servlet
    Path:
    src → New → Servlet → BookServlet

STEP 5 — Write Servlet Code
    import java.io.*;
    import java.sql.*;
    import javax.servlet.*;
    import javax.servlet.http.*;

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
                    "password"
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

STEP 6 — Configure URL Mapping

    web.xml
    <servlet>
        <servlet-name>BookServlet</servlet-name>
        <servlet-class>BookServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>BookServlet</servlet-name>
        <url-pattern>/books</url-pattern>
    </servlet-mapping>

STEP 7 - Run Project
    Right click project → Run on Server
    Open:
    http://localhost:8080/BookStoreApp/books

