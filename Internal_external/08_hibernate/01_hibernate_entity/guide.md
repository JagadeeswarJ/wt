# Week 10 — Hibernate Entity Mapping

Create Hibernate entity classes for books and users and map them to database tables.

---

## Prerequisites

- Eclipse 2026-03 installed
- MySQL running with password: `root`
- Internet connection (Eclipse downloads JARs automatically)

---

## Step 1 — Create MySQL Database

Open MySQL Workbench or MySQL command line and run:

```sql
CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author VARCHAR(100),
    price DOUBLE
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50)
);
```

---

## Step 2 — Create Maven Project in Eclipse

1. **File → New → Project...**
2. Search **"Maven"** → select **Maven Project** → Next
3. Check **"Create a simple project (skip archetype selection)"** → Next
4. Fill in:
   - **Group Id:** `com.bookstore`
   - **Artifact Id:** `hibernate-entity`
   - **Version:** `0.0.1-SNAPSHOT` (leave as is)
5. Click **Finish**

---

## Step 3 — Edit pom.xml

Double-click `pom.xml` → click the **pom.xml** tab at the bottom → replace all content with:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <groupId>com.bookstore</groupId>
  <artifactId>hibernate-entity</artifactId>
  <version>0.0.1-SNAPSHOT</version>

  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
  </properties>

  <dependencies>

    <!-- Hibernate -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>5.6.15.Final</version>
    </dependency>

    <!-- MySQL Driver -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
    </dependency>

  </dependencies>

</project>
```

**Save (Ctrl+S)** — Eclipse auto-downloads all Hibernate JARs. Wait for the progress bar at bottom-right to finish (~1-2 min).

---

## Step 4 — Create hibernate.cfg.xml

Right-click `src/main/resources` → **New → File** → name it `hibernate.cfg.xml` → paste:

```xml
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
  <session-factory>

    <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
    <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/bookstore</property>
    <property name="hibernate.connection.username">root</property>
    <property name="hibernate.connection.password">root</property>

    <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
    <property name="hibernate.show_sql">true</property>
    <property name="hibernate.hbm2ddl.auto">update</property>

    <mapping class="com.bookstore.Book"/>
    <mapping class="com.bookstore.User"/>

  </session-factory>
</hibernate-configuration>
```

---

## Step 5 — Create Package

Right-click `src/main/java` → **New → Package** → name it `com.bookstore`

---

## Step 6 — Create Entity Classes

Right-click `com.bookstore` package → **New → Class** for each file below.

### Book.java

```java
package com.bookstore;

import javax.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String author;
    private double price;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
```

### User.java

```java
package com.bookstore;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
```

---

## Step 7 — Create Test Class

Right-click `com.bookstore` → **New → Class** → name it `TestMapping`

### TestMapping.java

```java
package com.bookstore;

import org.hibernate.*;
import org.hibernate.cfg.Configuration;

public class TestMapping {
    public static void main(String[] args) {

        SessionFactory factory = new Configuration()
                .configure()
                .buildSessionFactory();

        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();

        Book b = new Book();
        b.setTitle("The Alchemist");
        b.setAuthor("Paulo Coelho");
        b.setPrice(299);
        session.save(b);

        User u = new User();
        u.setUsername("jagad");
        u.setPassword("pass123");
        session.save(u);

        tx.commit();
        session.close();
        factory.close();

        System.out.println("Book and User saved successfully!");
    }
}
```

---

## Step 8 — Run

Right-click `TestMapping.java` → **Run As → Java Application**

Expected Console output:
```
Hibernate: insert into books (author, price, title) values (?, ?, ?)
Hibernate: insert into users (password, username) values (?, ?)
Book and User saved successfully!
```

---

## Step 9 — Verify in MySQL

```sql
USE bookstore;
SELECT * FROM books;
SELECT * FROM users;
```

Expected output:
```
+----+---------------+--------------+-------+
| id | title         | author       | price |
+----+---------------+--------------+-------+
|  1 | The Alchemist | Paulo Coelho |   299 |
+----+---------------+--------------+-------+

+----+----------+----------+
| id | username | password |
+----+----------+----------+
|  1 | jagad    | pass123  |
+----+----------+----------+
```

---

## Project Structure (final)

```
hibernate-entity/
  src/main/java/com/bookstore/
    Book.java          <- @Entity mapped to "books" table
    User.java          <- @Entity mapped to "users" table
    TestMapping.java   <- saves one Book + one User to verify
  src/main/resources/
    hibernate.cfg.xml  <- DB connection config
  pom.xml              <- Hibernate + MySQL dependencies
```
