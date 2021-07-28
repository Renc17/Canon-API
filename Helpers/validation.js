const Joi = require('joi');

const RegisterValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(3)
            .required(),
        lastname: Joi.string()
            .min(3)
            .required(),
        password: Joi.string()
            .min(6),
        email: Joi.string()
            .email()
    })

    return schema.validate(data);
}

const LoginValidation = data => {
    const schema = Joi.object({
        password: Joi.string()
            .min(6),
        email: Joi.string()
            .email()
    })

    return schema.validate(data);
}

const ProductBodyValidation = data => {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .required(),
        description: Joi.string()
            .min(3)
            .required(),
        price: Joi.number()
            .required()
    })

    return schema.validate(data);
}

const CheckoutValidation = data => {
    const schema = Joi.object({
        city: Joi.string()
            .min(3)
            .required(),
        street: Joi.string()
            .min(3)
            .required(),
        number: Joi.string()
            .required(),
        po_box: Joi.string()
            .required(),
        phone: Joi.string()
            .required(),
        card_no: Joi.string()
            .required(),
        cvv: Joi.string()
            .required(),
        exp_date: Joi.date()
            .required()
    })

    return schema.validate(data);
}

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
module.exports.ProductBodyValidation = ProductBodyValidation;
module.exports.CheckoutValidation = CheckoutValidation;
