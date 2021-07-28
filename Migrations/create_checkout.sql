CREATE DATABASE IF NOT EXISTS canon;
USE canon;

CREATE TABLE IF NOT EXISTS checkout (
    id  INT PRIMARY KEY auto_increment,
    user_id int,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    po_box VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    card_no VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    exp_date VARCHAR(255) NOT NULL,
    total_cost int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE CASCADE
)
