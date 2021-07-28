const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const cors = require('cors')

app.use(cors())
global.__basedir = __dirname;

//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to my fake api');
})

//MIDDLEWARES
const productsRoute = require('./Routes/products');
app.use('/api/v1/products', productsRoute);

const cartRoute = require('./Routes/cart');
app.use('/api/v1/cart', cartRoute);

const checkoutRoute = require('./Routes/checkout');
app.use('/api/v1/checkout', checkoutRoute);

const userRoute = require('./Routes/users');
app.use('/api/v1/auth', userRoute);


//LISTEN
app.listen(8080, () => {
    console.log('server listening')
})
