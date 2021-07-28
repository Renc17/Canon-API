const cartModel = require('../Models/cart');

class CartController {
    GetProducts = async (req, res) => {
        const result = await cartModel.getAll();

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send(result);
    }

    GetById = async (req, res) => {
        const result = await cartModel.findOne({ id: req.params.id });

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send(result);
    }

    Add = async (req, res) => {
        const result = await cartModel.addProduct(req.body);

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send('Product was added to cart!');
    }

    DeleteById = async (req, res) => {
        const result = await cartModel.deleteOneProduct({ id: req.params.id });

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send(result);
    }

    EmptyCart = async (req, res) => {
        const result = await cartModel.deleteAllProducts({ id: req.params.id });

        if (!result) {
            return res.status(201).send('No products to delete')
        }
        res.sendStatus(200)
    }
}

module.exports = new CartController()
