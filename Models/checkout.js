const query = require('../config')
const { multipleColumnSet } = require('../Helpers/common.utils')
const cart = require('../Models/cart')
const checkoutValidation = require('../Helpers/validation').CheckoutValidation

class Checkout {
    create = async (params) => {
        //VALIDATE INPUT
        const { error } = await checkoutValidation(params.body);
        if (error) return [ 5, error.details[0].message ];

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
            await query(add_to_order_history, [order_history.insertId, element.id]);
        })

        await cart.deleteAllProducts({cart_id: params.user_id})

        return result.serverStatus;
    }

    getOrders = async (params) => {
        // TODO : Fix Get Orders
        const get_order_history_sql = `SELECT * FROM order_history WHERE user_id=${params.user_id}`;
        const history = await query(get_order_history_sql);

        const get_checkout_sql = `SELECT * FROM checkout WHERE id=?`;
        const get_checkout_order_sql = `SELECT * FROM orders WHERE  order_history_id=?`;
        const get_checkout_products_sql = `SELECT * FROM products WHERE  id=?`;

        let result = [];

        history.map(async checkout => {
            const details = await query(get_checkout_sql, [checkout.checkout_id]);
            console.log('Checkout details ', details[0]);
            const body = {
                checkout: details[0].city,
                //products: []
            };
            /*const orders = await query(get_checkout_order_sql, [checkout.checkout_id]);
            orders.map(async order => {
                const product = await query(get_checkout_products_sql, [order.product_id]);
                //console.log('Checkout product ', product);
                body.products.push(product);
            })*/
            result.push("details");
        })

        console.log(result);
    }
}

module.exports = new Checkout()

