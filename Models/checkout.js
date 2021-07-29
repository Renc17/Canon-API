const query = require('../config')
const { multipleColumnSet } = require('../Helpers/common.utils')
const cart = require('../Models/cart')
const fs = require("fs");
const checkoutValidation = require('../Helpers/validation').CheckoutValidation

class Checkout {
    create = async (params) => {
        //VALIDATE INPUT
        const { error } = await checkoutValidation(params.body);
        if (error) return [ 5, error.details[0].message ];

        const { keys, values } = multipleColumnSet(params.body)

        const cost_sql = `SELECT total_cost FROM cart WHERE id=${params.user.id}`;
        const cost = await query(cost_sql);

        const sql = `INSERT INTO checkout
        (user_id,total_cost,${keys.toString()}) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const input = [];
        input.push(params.user.id);
        input.push(cost[0].total_cost);
        values.forEach(element => input.push(element))

        const result = await query(sql, input);

        const order_history_sql = `INSERT INTO order_history
        (user_id,checkout_id) VALUES (?,?)`;

        const order_history = await query(order_history_sql, [params.user.id, result.insertId]);

        const add_to_order_history = `INSERT INTO orders
        (order_history_id, product_id) VALUES (?,?)`;

        const getCart = await cart.getAll(params);
        getCart.products.map(async element => {
            await query(add_to_order_history, [order_history.insertId, element.id]);
        })

        await cart.deleteAllProducts({cart_id: params.user.id})

        return result.serverStatus;
    }

    getOrders = async (params) => {
        const get_order_history_sql = `SELECT * FROM order_history WHERE user_id=${params.user_id}`;
        const history = await query(get_order_history_sql);

        const get_checkout_sql = `SELECT * FROM checkout WHERE id=?`;
        const get_checkout_order_sql = `SELECT * FROM orders WHERE  order_history_id=?`;
        const get_checkout_products_sql = `SELECT * FROM products WHERE  id=?`;

        const checkout_ids = [];

        history.map(checkout => {
            checkout_ids.push(checkout.checkout_id);
        })

        const checkout_address = [];
        for (const id of checkout_ids) {
            const address = await query(get_checkout_sql, [id]);
            const orders = await query(get_checkout_order_sql, [id]);

            const product_list = [];
            for (const order of orders) {
                const product_ret = await query(get_checkout_products_sql, [order.product_id]);
                const product = {
                    id: product_ret[0].id,
                    title: product_ret[0].title,
                    description: product_ret[0].description,
                    price: product_ret[0].price,
                    image: fs.readFileSync(product_ret[0].image, 'base64')
                }
                product_list.push(product);
            }

            const details = {
                address: address[0],
                order: product_list
            }
            checkout_address.push(details);
        }


        return checkout_address;
    }
}

module.exports = new Checkout()

