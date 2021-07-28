const checkoutModel = require('../Models/checkout')

class CheckoutController {
    GetOrdersHistory = async (req, res) => {
        const result = await checkoutModel.getOrders({ user_id: req.params.id });

        if (!result) {
            return res.status(400).send(result);
        }
        res.status(201).send('User checked out');
    }

    Checkout = async (req, res) => {
        const result = await checkoutModel.create({ body: req.body, user_id: req.params.id });

        if (result[0] === 5) {
            return res.status(400).send(result[1]);
        }
        res.status(201).send('User checked out');
    }
}

module.exports = new CheckoutController()
