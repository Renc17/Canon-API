const mysql2 = require('mysql2');
require('dotenv/config');
const fs = require('fs');
const path = require("path");

class Config {
    constructor() {
        this.db = mysql2.createPool({
            host: process.env.API_HOST,
            user: process.env.API_USER,
            password: process.env.API_PASSWORD,
            database: process.env.API_DB,
            multipleStatements: true
        })
        this.checkConnection()
        this.build_database()
    }

    checkConnection (){
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
            }
            if (connection) {
                console.log('Connection established')
            }
        });
    }

     build_database() {
        const productTable = fs.readFileSync(path.join(__dirname, './Migrations/create_products.sql')).toString()
        this.db.query(productTable, function (err, result) {
            if (err) throw err;
            console.log("productTable created");
        })

        const usersTable = fs.readFileSync(path.join(__dirname, './Migrations/create_users.sql')).toString()
        this.db.query(usersTable, function (err, result) {
            if (err) throw err;
            console.log("usersTable created");
        })

        const addressTable = fs.readFileSync(path.join(__dirname, './Migrations/create_checkout.sql')).toString()
        this.db.query(addressTable, function (err, result) {
            if (err) throw err;
            console.log("checkoutTable created");
        })

        const orderHistoryTable = fs.readFileSync(path.join(__dirname, './Migrations/create_order_history.sql')).toString()
        this.db.query(orderHistoryTable, function (err, result) {
            if (err) throw err;
            console.log("orderHistoryTable created");
        })

        const ordersTable = fs.readFileSync(path.join(__dirname, './Migrations/create_orders.sql')).toString()
        this.db.query(ordersTable, function (err, result) {
            if (err) throw err;
            console.log("ordersTable created");
        })

        const cartTable = fs.readFileSync(path.join(__dirname, './Migrations/create_cart.sql')).toString()
        this.db.query(cartTable, function (err, result) {
            if (err) throw err;
            console.log("cartTable created");
        })

        const cartItemTable = fs.readFileSync(path.join(__dirname, './Migrations/create_cart_item.sql')).toString()
        this.db.query(cartItemTable, function (err, result) {
            if (err) throw err;
            console.log("cartItemTable created");
        })
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports =  new Config().query
