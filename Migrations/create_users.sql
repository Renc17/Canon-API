CREATE DATABASE IF NOT EXISTS canon;
USE canon;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY auto_increment,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)
