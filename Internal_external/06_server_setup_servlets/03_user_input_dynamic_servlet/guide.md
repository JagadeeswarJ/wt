
Create a servlet that handles user input and displays dynamic content.
STEP 1 — Create HTML Form (Frontend)

    Create index.html inside webapp:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Book Input</title>
    </head>
    <body>

    <h2>Enter Book Details</h2>

    <form action="process" method="post">
        Book Name: <input type="text" name="book"><br><br>
        Price: <input type="number" name="price"><br><br>
        Quantity: <input type="number" name="qty"><br><br>

        <input type="submit" value="Submit">
    </form>

    </body>
    </html>
STEP 2 — Create Servlet

    Create: ProcessServlet.java

STEP 3 — Servlet Code
    import java.io.*;
    import javax.servlet.*;
    import javax.servlet.http.*;

    public class ProcessServlet extends HttpServlet {

        protected void doPost(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {

            response.setContentType("text/html");
            PrintWriter out = response.getWriter();

            // 1. Read user input
            String book = request.getParameter("book");
            double price = Double.parseDouble(request.getParameter("price"));
            int qty = Integer.parseInt(request.getParameter("qty"));

            // 2. Process logic
            double total = price * qty;

            // 3. Dynamic response
            out.println("<h2>Book Details</h2>");
            out.println("Book Name: " + book + "<br>");
            out.println("Price: " + price + "<br>");
            out.println("Quantity: " + qty + "<br>");
            out.println("<h3>Total Price: " + total + "</h3>");
        }
    }

STEP 4 — URL Mapping
    Using Annotation
    @WebServlet("/process")

STEP 5 — Run
    Run project on Apache Tomcat
    Open:
        http://localhost:8080/BookStoreApp/index.html
    Submit form → see dynamic output