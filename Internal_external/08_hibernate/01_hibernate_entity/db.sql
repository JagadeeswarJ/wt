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
  
 select * from users;
 select * from books;