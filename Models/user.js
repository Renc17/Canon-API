const query = require('../config')
require('dotenv/config');
const { multipleColumnSet } = require('../Helpers/common.utils')
const cartModel = require('../Models/cart');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidation = require('../Helpers/validation').RegisterValidation
const loginValidation = require('../Helpers/validation').LoginValidation


class UserModel {

    login = async (params) => {
        //VALIDATE INPUT
        const { error } = await loginValidation(params);
        if (error) return [ -1, error.details[0].message ];

        //CHECK IF EMAIL EXISTS
        const user = await this.findOne({ email: params.email })
        if (!user.length) return [ -1, "User Does Not Exists" ];

        //VALIDATE PASSWORD
        const passwordValidation = await bcrypt.compare(params.password, user[0].password);
        if (!passwordValidation) return [ -1, "invalid password" ];

        //GET JWT
        return jwt.sign({ id: user[0].id } , process.env.SECRET_TOKEN);
    }

    register = async (params) => {

        //VALIDATE INPUT
        const { error } = await registerValidation(params);
        if (error) return [ -1, error.details[0].message ];

        //CHECK IF EMAIL EXISTS
        const user = await this.findOne({ email: params.email })
        if (user.length) return [ -2, "User Exists" ];

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        params.password = await bcrypt.hash(params.password, salt);

        const { keys, values } = multipleColumnSet(params)

        const sql = `INSERT INTO users
        (${keys.toString()}) VALUES (?,?,?,?)`;

        const result = await query(sql, values);

        //CREATE CART
        const cart = await cartModel.createCart({ id: result.insertId, total_cost: 0 });
        if (!cart) {
            throw new Error('Something went wrong 500');
        }
        return result.insertId;
    }

    getAll = async () => {
        const sql = `SELECT * FROM users`;
        return await query(sql);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM users WHERE ${columnSet}`;
        return await query(sql,values);
    }

    deleteOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `DELETE FROM users WHERE ${columnSet}`;

        return await query(sql, values);
    }

    deleteAll = async () => {
        const sql = `DELETE FROM users`;

        const result = await query(sql);
        return result ? result.affectedRows : 0;
    }

    updateOne = async (params) => {
        //VALIDATE INPUT
        const { error } = await registerValidation(params.body);
        if (error) return [ -1, error.details[0].message ];

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        params.body.password = await bcrypt.hash(params.body.password, salt);

        const { updateColumnSet } = multipleColumnSet(params.body);
        const sql = `UPDATE users SET ${updateColumnSet} WHERE id=${params.id}`;
        const result = await query(sql);
        return result ? result.affectedRows : 0;
    }
}

module.exports = new UserModel()
