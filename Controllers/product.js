const productModel = require('../Models/product');
const fs = require("fs");

class ProductController {
    GetALL = async (req, res) => {
        const result = await productModel.getAll();

        if (!result) {
            res.sendStatus(500);
        }

        const products = [];

        result.map(element => {
            const product = {
                id: element.id,
                title: element.title,
                description: element.description,
                price: element.price,
                image: fs.readFileSync(element.image, 'base64')
            }
            products.push(product);
        })
        res.status(201).send(products);
    }

    GetById = async (req, res) => {
        const result = await productModel.findOne({ id: req.params.id });

        if (!result) {
            res.sendStatus(500);
        }

        const product = {
            id: result[0].id,
            title: result[0].title,
            description: result[0].description,
            price: result[0].price,
            image: fs.readFileSync(result[0].image, 'base64')
        }
        res.status(201).send(product);
    }

    Create = async (req, res) => {
        const file = req.file
        if (!file) {
            return res.status(400).send('Please upload a file');
        }

        const result = await productModel.create(req);

        if (result.length) {
            return res.status(400).send(result[1]);
        }

        res.status(201).send('Product was created!');
    }

    DeleteById = async (req, res) => {
        const result = await productModel.deleteOne({ id: req.params.id });

        if (!result) {
            res.sendStatus(500);
        }
        res.status(201).send(result);
    }

    DeleteAll = async (req, res) => {
        const result = await productModel.deleteAll();

        if (!result) {
            return res.status(201).send('No products to delete')
        }
        res.sendStatus(200)
    }

    UpdateById = async (req, res) => {
        const result = await productModel.updateOne({ id: req.params.id, body: req.body });

        if (!result) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    }
}

module.exports = new ProductController()
