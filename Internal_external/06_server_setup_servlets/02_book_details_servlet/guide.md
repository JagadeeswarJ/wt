Develop a servlet to display book details retrieved from a database
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


pom.xml
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>BookStoreAppDb</groupId>
  <artifactId>BookStoreAppDb</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>war</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

    <dependencies>

        <!-- Servlet API (Tomcat 9 → javax) -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>

        <!-- MySQL JDBC Driver -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>

    </dependencies>

    <build>
        <finalName>BookStoreApp</finalName>

        <plugins>

            <!-- Compiler -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
            </plugin>

            <!-- WAR Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.4.0</version>
            </plugin>

        </plugins>
    </build>
</project>
```