const query = require('../config')
const { multipleColumnSet } = require('../Helpers/common.utils')
const cart = require('../Models/cart')

class Checkout {
    create = async (params) => {
        //VALIDATE INPUT
        // TODO : make checkout validation

        console.log(params);
        const { keys, values } = multipleColumnSet(params.body)

        const cost_sql = `SELECT total_cost FROM cart WHERE id=${params.user_id}`;
        const cost = await query(cost_sql);

        const sql = `INSERT INTO checkout
        (user_id,total_cost,${keys.toString()}) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const input = [];
        input.push(params.user_id);
        input.push(cost[0].total_cost);
        values.forEach(element => input.push(element))

        const result = await query(sql, input);

        const order_history_swl = `INSERT INTO order_history
        (user_id,checkout_id) VALUES (?,?)`;
        const order_history = await query(order_history_swl, [params.user_id, result.insertId]);

        const add_to_order_history = `INSERT INTO orders
        (order_history_id, product_id) VALUES (?,?)`;

        const getCart = await cart.getAll();
        getCart.products.map(async element => {
            console.log(element.id);
            await query(add_to_order_history, [order_history.insertId, element.id]);
        })

        await cart.deleteAllProducts({cart_id: params.user_id})

        return result.serverStatus;
    }
}

module.exports = new Checkout()

