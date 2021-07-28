const checkoutModel = require('../Models/checkout')

class CheckoutController {
    GetOrders = async (req, res) => {

    }

    Checkout = async (req, res) => {
        const result = await checkoutModel.create({ body: req.body, user_id: req.params.id });

        if (result !== 2) {
            throw new Error('Something went wrong');
        }
        res.status(201).send('User checked out');
    }
}

module.exports = new CheckoutController()
