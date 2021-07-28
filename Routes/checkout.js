const express = require('express')
const checkoutController = require('../Controllers/checkout')

const router = express.Router()

// ROUTES
router.route('/:id')
    .get(checkoutController.GetOrders)
    .post(checkoutController.Checkout)

module.exports = router;
