Create Hibernate entity classes for books and users and map them to database tables. 

⚙️ STEP 1 — Add Hibernate Dependencies

In your project (Eclipse IDE):

Add JARs:

hibernate-core
mysql-connector
jakarta.persistence (or javax.persistence)

⚠️ Without these → nothing works

⚙️ STEP 2 — Create Database Tables (MySQL)
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
⚙️ STEP 3 — Create Entity Class: Book.java
import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String author;
    private double price;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
⚙️ STEP 4 — Create Entity Class: User.java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
⚙️ STEP 5 — Create hibernate.cfg.xml

Place inside src

<!DOCTYPE hibernate-configuration PUBLIC
"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
"http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
 <session-factory>

  <!-- DB Connection -->
  <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
  <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/bookstore</property>
  <property name="hibernate.connection.username">root</property>
  <property name="hibernate.connection.password">password</property>

  <!-- Dialect -->
  <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>

  <!-- Debug -->
  <property name="hibernate.show_sql">true</property>

  <!-- Mapping -->
  <mapping class="Book"/>
  <mapping class="User"/>

 </session-factory>
</hibernate-configuration>
⚙️ STEP 6 — Test Mapping (Important)

Create a simple test class:

import org.hibernate.*;
import org.hibernate.cfg.Configuration;

public class TestHibernate {
    public static void main(String[] args) {

        SessionFactory factory = new Configuration()
                .configure()
                .buildSessionFactory();

        Session session = factory.openSession();
        Transaction tx = session.beginTransaction();

        Book b = new Book();
        b.setTitle("Hibernate Basics");
        b.setAuthor("Someone");
        b.setPrice(600);

        session.save(b);

        tx.commit();
        session.close();

        System.out.println("Data saved!");
    }
}