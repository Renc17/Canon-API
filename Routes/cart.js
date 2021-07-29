const express = require('express')
const cartController = require('../Controllers/cart')
const verify = require('../Helpers/verifyToken')

const router = express.Router()

// ROUTES
router.route('/')
    .get(verify, cartController.GetProducts)
    .post(verify, cartController.Add)
    .delete(verify, cartController.EmptyCart)

router.route('/:id')
    .delete(verify, cartController.DeleteById)

module.exports = router;
