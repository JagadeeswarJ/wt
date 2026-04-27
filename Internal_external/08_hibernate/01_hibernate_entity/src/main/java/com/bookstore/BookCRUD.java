package com.bookstore;

import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import java.util.List;

public class BookCRUD {

    static SessionFactory factory = new Configuration().configure().buildSessionFactory();

    // CREATE
    static void createBook() {
        Session s = factory.openSession();
        Transaction tx = s.beginTransaction();

        Book b = new Book();
        b.setTitle("Atomic Habits");
        b.setAuthor("James Clear");
        b.setPrice(399);
        s.save(b);

        tx.commit();
        s.close();
        System.out.println("Created.");
    }

    // READ ALL
    static void readAll() {
        Session s = factory.openSession();
        List<Book> list = s.createQuery("from Book", Book.class).list();
        for (Book b : list)
            System.out.println(b.getId() + " | " + b.getTitle() + " | Rs." + b.getPrice());
        s.close();
    }

    // UPDATE
    static void updateBook(int id, double newPrice) {
        Session s = factory.openSession();
        Transaction tx = s.beginTransaction();

        Book b = s.get(Book.class, id);
        b.setPrice(newPrice);
        s.update(b);

        tx.commit();
        s.close();
        System.out.println("Updated.");
    }

    // DELETE
    static void deleteBook(int id) {
        Session s = factory.openSession();
        Transaction tx = s.beginTransaction();

        Book b = s.get(Book.class, id);
        s.delete(b);

        tx.commit();
        s.close();
        System.out.println("Deleted.");
    }

    public static void main(String[] args) {
        createBook();
        System.out.println("-- After Create --");
        readAll();

        updateBook(1, 450);
        System.out.println("-- After Update --");
        readAll();

        deleteBook(1);
        System.out.println("-- After Delete --");
        readAll();

        factory.close();
    }
}