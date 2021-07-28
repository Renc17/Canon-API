const query = require('../config')
const { multipleColumnSet } = require('../Helpers/common.utils')
const productModel = require('../Models/product')
const fs = require("fs");

class CartModel {
    getAll = async () => {
        let sql = `SELECT * FROM cart_item INNER JOIN products ON cart_item.product_id = products.id`;
        const total_cost_br = await this.getCost({id: 1});  // TODO : Change to user_id
        const result = await query(sql);

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
        return {
            products: products,
            total_cost: total_cost_br[0].total_cost
        };
    }

    getCost = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT total_cost FROM cart WHERE ${columnSet}`;
        return await query(sql,values);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM cart WHERE ${columnSet}`;
        return await query(sql,values);
    }

    createCart = async (params) => {
        const { keys, values } = multipleColumnSet(params)
        const sql = `INSERT INTO cart
        (${keys.toString()}) VALUES (?,?)`;

        const result = await query(sql, values);
        return result.affectedRows;
    }

    addProduct = async (params) => {

        // TODO : update quantity if product is in bucket
        const { keys, values } = multipleColumnSet(params)
        const sql = `INSERT INTO cart_item
        (${keys.toString()}) VALUES (?,?,?)`;

        const result = await query(sql, values);

        const product = await productModel.findOne({id: params.product_id });
        const cart = await this.findOne({ id: params.cart_id });

        const data = {
            product: {
                price: product[0].price,
                quantity: params.quantity,
            },
            cart: {
                id: params.cart_id,
                total_cost: cart[0].total_cost
            }
        }

        await this.changeTotalCost(data);
        return result ? result.affectedRows : 0;
    }

    changeTotalCost = async (params) => {
        const cost = params.cart.total_cost + params.product.price*params.product.quantity;
        const sql = `UPDATE cart SET total_cost=${cost} WHERE id=${params.cart.id}`;
        await query(sql);
    }

    deleteOneProduct = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `DELETE FROM cart_item WHERE ${columnSet}`;

        // TODO : Change total cost on delete
        // TODO : fix params
        const product = await productModel.findOne({id: params.id });
        /*const cart = await this.findOne({ id: params.cart_id });

        const data = {
            product: {
                price: -product[0].price
            },
            cart: {
                id: params.cart_id,
                quantity: params.quantity,
                total_cost: cart[0].total_cost
            }
        }

        await this.changeTotalCost(data);*/
        return await query(sql, values);
    }

    deleteAllProducts = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `DELETE FROM cart_item WHERE ${columnSet}`;

        const result = await query(sql, values);

        const zero_cost_sql = `UPDATE cart SET total_cost=0 WHERE id=${params.cart_id}`;
        await query(zero_cost_sql);

        return result ? result.affectedRows : 0;
    }
}

module.exports = new CartModel()
