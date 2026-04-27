CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

CREATE TABLE IF NOT EXISTS books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author VARCHAR(100),
    price DOUBLE
);

INSERT INTO books (title, author, price) VALUES
('Java', 'James', 500),
('Servlets', 'Oracle', 300);

SELECT * FROM books;

select @@version;
INSERT INTO users (username, password) VALUES
('admin', '1234'),
('user1', 'pass');