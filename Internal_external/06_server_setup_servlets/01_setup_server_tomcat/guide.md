Install and configure Apache Tomcat server in Eclipse IDE. 
STEP 1 — Install Tomcat
    1. Download
    Go to: https://tomcat.apache.org
    Download:
    Tomcat 9 (recommended for labs)
    2. Extract
    Extract ZIP to:
    C:\apache-tomcat-9

STEP 2 — Verify Tomcat (important)
    Before touching Eclipse, check if Tomcat works standalone.
    Run:
    C:\apache-tomcat-9\bin\startup.bat
    Then open:
    http://localhost:8080

STEP 3 — Configure in Eclipse
    1. Open Eclipse

    Make sure you installed:

    Eclipse IDE for Enterprise Java / Dynamic Web
    2. Add Server

    Go to:

    Window → Show View → Servers

    Then:

    Right Click → New → Server

    Select:

    Apache → Tomcat v9.0 Server

    Click Next

    3. Link Tomcat Directory

    Set:

    Tomcat installation directory → C:\apache-tomcat-9

    Click Finish
STEP 4 — Start Server

    In Servers tab:

    Right click → Start

    Watch console:

    Server startup in XXXX ms
    
STEP 5 — Verify inside Eclipse

    Open browser:

    http://localhost:8080

    Same Tomcat page should load.