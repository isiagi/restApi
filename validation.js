//validation
const joi = require('@hapi/joi');

//RegisterValidation

const registerVaildation =  data  => {
const Schema  = {
    name: joi.string()
    .min(6)
    .required(),
    email: joi.string()
    .min(6)
    .required(),
    password: joi.string()
    .min(6)
    .required()
}
return joi.validate(data, Schema)
};


const loginVaildation =  data  => {
    const Schema  = {
        email: joi.string()
        .min(6)
        .required(),
        password: joi.string()
        .min(6)
        .required()
    }
    return joi.validate(data, Schema)
    };
    
    


module.exports.registerVaildation = registerVaildation;
module.exports.loginVaildation = loginVaildation;