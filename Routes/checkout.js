const express = require('express')
const checkoutController = require('../Controllers/checkout')
const verify = require('../Helpers/verifyToken')

const router = express.Router()

// ROUTES
router.route('/')
    .get(verify, checkoutController.GetOrdersHistory)
    .post(verify, checkoutController.Checkout)

module.exports = router;
