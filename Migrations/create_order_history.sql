CREATE DATABASE IF NOT EXISTS canon;
USE canon;

CREATE TABLE IF NOT EXISTS order_history (
    id INT PRIMARY KEY auto_increment,
    user_id int,
    checkout_id int,

    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE CASCADE,
    FOREIGN KEY (checkout_id)
          REFERENCES checkout (id)
          ON DELETE CASCADE
)
