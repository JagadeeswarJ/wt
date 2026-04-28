# Week 8 — Servlet for User Input & Dynamic Content

Create a servlet that handles user input from a form and displays dynamic content.

---

## Prerequisites

Same `BookStoreApp` Maven project from the previous task.
No new project needed — just add new files.

---

## Step 1 — Create HTML Form

Right-click `src/main/webapp` → **New → File** → `index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Book Input</title>
  <style>
    body { font-family: Arial; padding: 40px; background: #f5f5f5; }
    .box { background: white; padding: 30px; border-radius: 8px;
           box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 320px; }
    h2 { color: #2c3e50; margin-bottom: 20px; }
    label { display: block; margin-top: 10px; font-size: 14px; }
    input[type=text], input[type=number] {
      width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; }
    button { margin-top: 20px; width: 100%; padding: 10px;
             background: #2c3e50; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Enter Book Details</h2>
    <form action="process" method="post">
      <label>Book Name</label>
      <input type="text" name="book" required/>
      <label>Price</label>
      <input type="number" name="price" required/>
      <label>Quantity</label>
      <input type="number" name="qty" required/>
      <button type="submit">Submit</button>
    </form>
  </div>
</body>
</html>
```

---

## Step 2 — Create Servlet

Right-click `com.bookstore` → **New → Class** → name it `ProcessServlet`

### ProcessServlet.java

```java
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

        String book  = request.getParameter("book");
        double price = Double.parseDouble(request.getParameter("price"));
        int qty      = Integer.parseInt(request.getParameter("qty"));
        double total = price * qty;

        out.println("<html><body style='font-family:Arial;padding:40px'>");
        out.println("<h2>Book Details</h2>");
        out.println("<p>Book Name: <b>" + book + "</b></p>");
        out.println("<p>Price: Rs. " + price + "</p>");
        out.println("<p>Quantity: " + qty + "</p>");
        out.println("<h3>Total: Rs. " + total + "</h3>");
        out.println("<a href='index.html'>Go Back</a>");
        out.println("</body></html>");
    }
}
```

---

## Step 3 — Run

Right-click project → **Run As → Run on Server**

Open browser:
```
http://localhost:8080/BookStoreApp/index.html
```

Fill the form → Submit → see dynamic output.

---

## Project Structure

```
BookStoreApp/
  src/main/java/com/bookstore/
    BookServlet.java       <- from previous task
    ProcessServlet.java    <- new
  src/main/webapp/
    index.html             <- new
    WEB-INF/
      web.xml
  pom.xml
```
