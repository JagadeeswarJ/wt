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