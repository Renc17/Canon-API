const query = require('../config')
const fs = require("fs");
const sharp = require('sharp')
const path = require('path')
const { multipleColumnSet } = require('../Helpers/common.utils')
const productBodyValidation = require('../Helpers/validation').ProductBodyValidation

class ProductModel {
    // ADMIN ACCESS
    create = async (params) => {
        //VALIDATE INPUT
        const { error } = await productBodyValidation(params.body);
        if (error) return [ -1, error.details[0].message ];

        fs.readFileSync(__basedir + "/resources/static/uploads/" + params.file.filename);
        const { filename: file } = params.file;
        await sharp(params.file.path)
            .resize(250,250, {fit: 'contain',
                    background: { r: 255, g: 255, b: 255 }
                })
            .png()
            .toFile(
                path.resolve(params.file.destination, 'resized', file)
            )
        fs.unlinkSync(params.file.path)

        const image = params.file.destination + '/resized/' + params.file.filename;

        const { keys, values } = multipleColumnSet(params.body)

        const sql = `INSERT INTO products
        (image, ${keys.toString()}) VALUES (?,?,?,?)`;

        const input = [];
        input.push(image);
        values.forEach(element => input.push(element))

        const result = await query(sql, input);
        return result ? result.affectedRows : 0;
    }

    getAll = async () => {
        const sql = `SELECT * FROM products`;
        return await query(sql);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM products WHERE ${columnSet}`;
        return await query(sql,values);
    }

    // ADMIN ACCESS
    deleteOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `DELETE FROM products WHERE ${columnSet}`;

        return await query(sql, values);
    }

    // ADMIN ACCESS
    deleteAll = async () => {
        const sql = `DELETE FROM products`;

        const result = await query(sql);
        return result ? result.affectedRows : 0;
    }

    // ADMIN ACCESS
    updateOne = async (params) => {
        //VALIDATE INPUT
        const { error } = await productBodyValidation(params.body);
        if (error) return [ -1, error.details[0].message ];

        const { updateColumnSet } = multipleColumnSet(params.body);
        const sql = `UPDATE products SET ${updateColumnSet} WHERE id=${params.id}`;
        const result = await query(sql);
        return result ? result.affectedRows : 0;
    }
}

module.exports = new ProductModel()
