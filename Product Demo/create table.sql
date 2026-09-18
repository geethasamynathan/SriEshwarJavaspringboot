CREATE DATABASE IF NOT EXISTS product_cart_db;

USE product_cart_db;

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500)
);

CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,

    CONSTRAINT fk_cart_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

INSERT INTO products
(name, category, price, stock_quantity, image_url)
VALUES
('Laptop', 'Electronics', 55000.00, 5, '/images/laptop.jpg'),

('Wireless Mouse', 'Electronics', 1200.00, 15, '/images/mouse.jpg'),

('Keyboard', 'Electronics', 2500.00, 0, '/images/keyboard.jpg'),

('Headphones', 'Electronics', 3500.00, 8, '/images/headphones.jpg'),

('Office Chair', 'Furniture', 8500.00, 4, '/images/chair.jpg'),

('Coffee Mug', 'Home', 450.00, 20, '/images/mug.jpg');



SELECT * FROM products;

INSERT INTO cart_items (product_id, quantity)
VALUES
(1, 1),
(2, 2);

SELECT * FROM cart_items;


SELECT
    ci.id AS cart_item_id,
    p.id AS product_id,
    p.name AS product_name,
    p.category,
    p.price,
    ci.quantity,
    p.price * ci.quantity AS total_price
FROM cart_items ci
JOIN products p
    ON ci.product_id = p.id;