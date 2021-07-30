const query = require('../config')
const { multipleColumnSet } = require('../Helpers/common.utils')
const productModel = require('../Models/product')
const fs = require("fs");

class CartModel {
    getAll = async (params) => {
        let sql = `SELECT * FROM cart_item INNER JOIN products ON cart_item.product_id = products.id`;
        const total_cost_br = await this.getCost({id: params.user.id});
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

    findOneCart = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM cart WHERE ${columnSet}`;
        return await query(sql,values);
    }

    findOneItemInCart = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM cart_item WHERE ${columnSet}`;
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

        const existing_item = await this.findOneItemInCart({ product_id: params.body.product_id });
        let quantity;
        if (!existing_item.length){
            const { keys, values } = multipleColumnSet(params.body)
            const sql = `INSERT INTO cart_item
            (${keys.toString()},cart_id) VALUES (?,?,?)`;

            values.push(params.user.id)
            await query(sql, values);
        }else {
            quantity = existing_item[0].quantity + 1;
            const sql = `UPDATE cart_item SET quantity=${quantity} WHERE product_id=${params.body.product_id}`;
            await query(sql);
        }

        const cart = await this.findOneCart({ id: params.user.id });
        const product = await productModel.findOne({id: params.body.product_id });

        const data = {
            product: {
                price: product[0].price,
                quantity: 1,
            },
            cart: {
                id: params.user.id,
                total_cost: cart[0].total_cost
            }
        }

        const result = await this.changeTotalCost(data);
        return result ? result.affectedRows : 0;
    }

    changeTotalCost = async (params) => {
        const total_cost = params.cart.total_cost + params.product.price*params.product.quantity;
        const sql = `UPDATE cart SET total_cost=${total_cost} WHERE id=${params.cart.id}`;
        return await query(sql);
    }

    deleteOneProduct = async (params) => {
        const sql = `DELETE FROM cart_item WHERE product_id=? AND cart_id=?`;
        const product = await productModel.findOne({id: params.params.id });
        const product_in_cart = await this.findOneItemInCart({ product_id: params.params.id });
        const cart = await this.findOneCart({ id: params.user.id });

        const data = {
            product: {
                price: -product[0].price,
                quantity: product_in_cart[0].quantity,
            },
            cart: {
                id: params.user.id,
                total_cost: cart[0].total_cost
            }
        }
        await this.changeTotalCost(data);
        return await query(sql, [params.params.id, params.user.id]);
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
