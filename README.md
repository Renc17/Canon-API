# Canon API
Fake store REST API that you can use whenever you need Pseudo-real data for your ecommerce website without running any server-side code. It's great for website prototype, testing, etc.

Theme : canon camera and other related equipment.
# Resources

######*for requests that require user to be logged in, add to header auth-token: 'user token'

### Products
GET : localhost:8080/api/v1/products &emsp; &emsp; &emsp; &emsp;  >>> &emsp; get all products (store/shop)

POST : localhost:8080/api/v1/products &emsp; &emsp; &emsp; &emsp; >>> &emsp; create product

DELETE : localhost:8080/api/v1/products &emsp; &emsp; &emsp; &emsp; >>> &emsp; delete all products from DB

GET : localhost:8080/api/v1/products/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; get product with id

PATCH : localhost:8080/api/v1/products/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; update product with id

DELETE : localhost:8080/api/v1/products/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; delete product with id


### Cart
GET : localhost:8080/api/v1/cart &emsp; &emsp; &emsp; &emsp; >>> &emsp; logged in user get products in cart

POST : localhost:8080/api/v1/cart &emsp; &emsp; &emsp; &emsp; >>> &emsp; logged in user post products in cart

DELETE : localhost:8080/api/v1/cart &emsp; &emsp; &emsp; &emsp; >>> &emsp; logged in user empty cart

DELETE : localhost:8080/api/v1/cart/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; logged in user delete products from cart

### Checkout
GET : localhost:8080/api/v1/checkout &emsp; &emsp; &emsp; &emsp; >>> &emsp; logged in user get all orders

POST : localhost:8080/api/v1/checkout &emsp; &emsp; &emsp; &emsp; >>> &emsp; logged in checkout order

### Users
POST : localhost:8080/api/v1/auth/login &emsp; &emsp; &emsp; &emsp; >>> &emsp; login user, get auth token

POST : localhost:8080/api/v1/auth/register &emsp; &emsp; &emsp; &emsp; >>> &emsp; register user in DB

GET : localhost:8080/api/v1/auth/users &emsp; &emsp; &emsp; &emsp; >>> &emsp; get all users from DB

DELETE : localhost:8080/api/v1/auth/users &emsp; &emsp; &emsp; &emsp; >>> &emsp; delete all users from DB

GET : localhost:8080/api/v1/auth/users/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; get user with id

PATCH : localhost:8080/api/v1/auth/users/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; update user with id

DELETE : localhost:8080/api/v1/auth/users/:id &emsp; &emsp; &emsp; &emsp; >>> &emsp; delete user with id


## TODO
Add admin role
