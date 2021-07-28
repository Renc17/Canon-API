
CREATE DATABASE IF NOT EXISTS canon;
USE canon;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY auto_increment,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(600) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255)
)
