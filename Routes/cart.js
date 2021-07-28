const express = require('express')
const cartController = require('../Controllers/cart')

const router = express.Router()

// ROUTES
router.route('/')
    .get(cartController.GetProducts)
    .post(cartController.Add)


router.route('/:id')
    .get(cartController.GetById)
    .delete(cartController.EmptyCart)

router.route('/product/:id')
    .delete(cartController.DeleteById)

module.exports = router;
