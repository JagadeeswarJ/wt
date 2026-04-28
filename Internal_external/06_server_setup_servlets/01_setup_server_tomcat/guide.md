# Week 7 — Install & Configure Apache Tomcat in Eclipse

---

## Step 1 — Download Tomcat

- Go to: https://tomcat.apache.org
- Download **Tomcat 9** → Binary Distribution → ZIP
- Extract to: `C:\apache-tomcat-9`

---

## Step 2 — Verify Tomcat Standalone

Before touching Eclipse, confirm Tomcat works on its own.

Run:
```
C:\apache-tomcat-9\bin\startup.bat
```

Open browser → `http://localhost:8080`
You should see the Tomcat welcome page.

---

## Step 3 — Add Tomcat to Eclipse

1. **Window → Show View → Servers**
2. In the Servers tab → right-click → **New → Server**
3. Select **Apache → Tomcat v9.0 Server** → Next
4. Set **Tomcat installation directory** → `C:\apache-tomcat-9`
5. Click **Finish**

---

## Step 4 — Start Server from Eclipse

In the Servers tab → right-click Tomcat → **Start**

Watch the Console at the bottom:
```
Server startup in XXXX ms
```

---

## Step 5 — Verify

Open browser → `http://localhost:8080`

Same Tomcat page should load — Tomcat is now configured in Eclipse.
