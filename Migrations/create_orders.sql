CREATE DATABASE IF NOT EXISTS canon;
USE canon;

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY auto_increment,
    order_history_id int,
    product_id int,

    FOREIGN KEY (order_history_id)
      REFERENCES order_history (id)
      ON DELETE CASCADE,
    FOREIGN KEY (product_id)
          REFERENCES products (id)
          ON DELETE CASCADE
)
