Perform CRUD operations using Hibernate for book records.
⚙️ STEP 0 — Pre-requisites

You already have:

Book.java (Entity)
hibernate.cfg.xml
DB table books
⚙️ STEP 1 — Setup Hibernate SessionFactory
import org.hibernate.*;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    public static SessionFactory getFactory() {
        return new Configuration().configure().buildSessionFactory();
    }
}
⚙️ STEP 2 — CREATE (Insert)
Session session = HibernateUtil.getFactory().openSession();
Transaction tx = session.beginTransaction();

Book b = new Book();
b.setTitle("Java");
b.setAuthor("James");
b.setPrice(500);

session.save(b);

tx.commit();
session.close();

👉 Hibernate generates:

INSERT INTO books ...
⚙️ STEP 3 — READ (Fetch Data)
Get by ID
Session session = HibernateUtil.getFactory().openSession();

Book b = session.get(Book.class, 1);

System.out.println(b.getTitle());

session.close();
Get All Records
Session session = HibernateUtil.getFactory().openSession();

List<Book> list = session.createQuery("from Book", Book.class).list();

for (Book b : list) {
    System.out.println(b.getTitle());
}

session.close();

👉 HQL (from Book) → Hibernate converts to SQL

⚙️ STEP 4 — UPDATE
Session session = HibernateUtil.getFactory().openSession();
Transaction tx = session.beginTransaction();

Book b = session.get(Book.class, 1);
b.setPrice(800);

session.update(b);

tx.commit();
session.close();

👉 Hibernate generates:

UPDATE books SET price=800 WHERE id=1
⚙️ STEP 5 — DELETE
Session session = HibernateUtil.getFactory().openSession();
Transaction tx = session.beginTransaction();

Book b = session.get(Book.class, 1);
session.delete(b);

tx.commit();
session.close();