const cartModel = require('../Models/cart');

class CartController {
    GetProducts = async (req, res) => {
        const result = await cartModel.getAll(req);

        if (!result) {
            res.sendStatus(500);
        }
        res.status(201).send(result);
    }

    Add = async (req, res) => {
        const result = await cartModel.addProduct(req);

        if (!result) {
            res.sendStatus(500);
        }
        res.status(201).send('Product was added to cart!');
    }

    DeleteById = async (req, res) => {
        const result = await cartModel.deleteOneProduct(req);

        if (!result) {
            res.sendStatus(500);
        }
        res.status(201).send(result);
    }

    EmptyCart = async (req, res) => {
        const result = await cartModel.deleteAllProducts({ cart_id: req.user.id });

        if (!result) {
            return res.status(201).send('No products to delete')
        }
        res.sendStatus(200)
    }
}

module.exports = new CartController()
