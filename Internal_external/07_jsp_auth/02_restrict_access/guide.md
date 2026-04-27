# Restrict Access to Pages Based on User Login Status (JSP Session Management)

---

## ⚙️ STEP 1 — Modify `LoginServlet.java` (Add Session)

Update the `doPost()` method from the previous servlet to create a session on successful login:

```java
import javax.servlet.http.HttpSession;

// Inside doPost(), replace the if-else block:

if (rs.next()) {
    // Create session and store username
    HttpSession session = request.getSession();
    session.setAttribute("user", user);
    response.sendRedirect("dashboard.jsp");
} else {
    response.sendRedirect("error.jsp");
}
```

---

## ⚙️ STEP 2 — Create Protected Page `dashboard.jsp`

> 📁 Place inside `WebContent/`

```jsp
<%@ page language="java" %>
<%
    String user = (String) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>
<html>
<body>
    <h2>Welcome, <%= user %>!</h2>
    <a href="logout">Logout</a>
</body>
</html>
```

> 🔒 If no session exists, the user is automatically redirected to `login.jsp`.

---

## ⚙️ STEP 3 — Create `LogoutServlet.java`

```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate(); // Destroy session
        }

        response.sendRedirect("login.jsp");
    }
}
```

---

## ⚙️ STEP 4 — Test Flow

### ✅ Case 1 — Normal Login

```
Open login.jsp → Enter valid credentials → Redirected to dashboard.jsp ✔
```

### 🔒 Case 2 — Direct Access Without Login

```
Open dashboard.jsp directly (without logging in) → Redirected to login.jsp ✔
```

### 🚪 Case 3 — Logout

```
Click "Logout" on dashboard → Session destroyed → Redirected to login.jsp ✔
```

---

## 📁 File Structure Summary

```
WebContent/
├── login.jsp
├── dashboard.jsp
├── error.jsp
└── WEB-INF/
    └── classes/
        ├── LoginServlet.java
        └── LogoutServlet.java
```

---

## 🔄 Flow Diagram

```
[login.jsp] → (POST /login) → LoginServlet
                                   │
               ┌───────────────────┴───────────────────┐
           valid credentials                     invalid credentials
               │                                        │
     session.setAttribute("user")              redirect → error.jsp
               │
     redirect → dashboard.jsp
                   │
           session exists? ──No──→ redirect → login.jsp
                   │
                  Yes
                   │
           Show welcome page
                   │
           Click Logout
                   │
        (GET /logout) → LogoutServlet
                   │
           session.invalidate()
                   │
           redirect → login.jsp
```