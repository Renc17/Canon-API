const userModel = require('../Models/user');

class UserController {
    // ADMIN ACCESS
    GetALL = async (req, res) => {
        const result = await userModel.getAll();

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send(result);
    }

    GetById = async (req, res) => {
        const result = await userModel.findOne({ id: req.params.id });

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send(result);
    }

    Register = async (req, res) => {
        const result = await userModel.register(req.body);

        if (result.length) {
            return res.status(400).send(result[1]);
        }

        res.sendStatus(201);
    }

    Login = async (req, res) => {
        const result = await userModel.login(req.body);

        if (result[0] === -1) {
            return res.status(400).send(result[1]);
        }

        res.header('auth-token', result).send(result);
    }

    DeleteById = async (req, res) => {
        const result = await userModel.deleteOne({ id: req.params.id });

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.status(201).send(result);
    }

    // ADMIN ACCESS
    DeleteAll = async (req, res) => {
        const result = await userModel.deleteAll();

        if (!result) {
            return res.status(201).send('No products to delete')
        }
        res.sendStatus(200)
    }

    UpdateById = async (req, res) => {
        const result = await userModel.updateOne({ body: req.body, id: req.params.id });

        if (!result) {
            throw new Error('Something went wrong 500');
        }
        res.sendStatus(200);
    }
}

module.exports = new UserController()
