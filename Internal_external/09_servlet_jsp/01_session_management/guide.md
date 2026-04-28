# Week 9 — Session Management (Login / Logout)

Develop a servlet program to handle session management (login/logout functionality).

---

## Prerequisites

- Eclipse with Apache Tomcat 9.x configured
- Tomcat running (verified at http://localhost:8080)

---

## Step 1 — Create Dynamic Web Project

1. **File → New → Dynamic Web Project**
2. Fill in:
   - **Project name:** `BookStoreApp`
   - **Target runtime:** Apache Tomcat 9.x
3. Click **Next → Next**
4. Check **"Generate web.xml deployment descriptor"**
5. Click **Finish**

---

## Project Structure

```
BookStoreApp/
  src/main/java/              <- Java servlet files go here
  src/main/webapp/
    WEB-INF/
      web.xml
    login.html                <- HTML files go here
```

---

## Step 2 — Create login.html

Right-click `src/main/webapp` → **New → File** → `login.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <style>
    body { font-family: Arial; display: flex; justify-content: center; padding-top: 80px; background: #f0f0f0; }
    .box { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 300px; }
    h2 { margin-bottom: 20px; color: #2c3e50; }
    input[type=text], input[type=password] { width: 100%; padding: 8px; margin: 6px 0 14px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #2c3e50; color: white; border: none; cursor: pointer; }
    .error { color: red; font-size: 13px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Bookstore Login</h2>
    <form action="login" method="post">
      <label>Username</label>
      <input type="text" name="username" required/>
      <label>Password</label>
      <input type="password" name="password" required/>
      <button type="submit">Login</button>
      <p class="error">${param.error == '1' ? 'Invalid credentials.' : ''}</p>
    </form>
  </div>
</body>
</html>
```

---

## Step 3 — Create Servlet Classes

First create a package:
Right-click `src/main/java` → **New → Package** → name it `com.bookstore` → Finish

Then right-click `com.bookstore` → **New → Class** for each file below.

### LoginServlet.java

```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        if ("admin".equals(user) && "1234".equals(pass)) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            response.sendRedirect("home");
        } else {
            response.sendRedirect("login.html?error=1");
        }
    }
}
```

### HomeServlet.java

```java
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
```

### LogoutServlet.java

```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();
        response.sendRedirect("login.html");
    }
}
```

---

## Step 4 — Run on Tomcat

Right-click `BookStoreApp` → **Run As → Run on Server** → select Tomcat 9 → Finish

Open browser:
```
http://localhost:8080/BookStoreApp/login.html
```

Login credentials:
- **Username:** `admin`
- **Password:** `1234`

---

## Test Cases

| Action | Expected Result |
|--------|----------------|
| Login with `admin` / `1234` | Redirects to home, shows Welcome |
| Login with wrong credentials | Stays on login with "Invalid credentials" |
| Open `/home` directly without login | Redirected to login |
| Click Logout | Session destroyed, back to login |
| Press Back after logout | Still redirected to login |

---

## How It Works

```
login.html  →  POST /login  →  LoginServlet
                                  ↓ wrong?  →  redirect login.html?error=1
                                  ↓ correct →  session.setAttribute("user")
                                               redirect → /home
                                                            ↓
                                                      HomeServlet
                                                        ↓ no session → redirect login
                                                        ↓ session ok → show welcome
                                                        click Logout
                                                            ↓
                                                      LogoutServlet
                                                        → session.invalidate()
                                                        → redirect login.html
```

pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.bookstore</groupId>
    <artifactId>BookStoreApp</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>BookStore Application</name>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>

        <!-- ✅ Servlet API (Tomcat 9 uses javax) -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>

        <!-- ✅ JSP API -->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>2.3.3</version>
            <scope>provided</scope>
        </dependency>

        <!-- ✅ MySQL Driver -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>

            <!-- Compiler -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
            </plugin>

            <!-- WAR plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.4.0</version>
            </plugin>

        </plugins>
    </build>

</project>

```