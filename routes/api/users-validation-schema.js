const Joi = require('joi');

const userValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const verifyEmail = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (error) {
    // const errorType = Object.values(error)[1].map((x) => x.type);
    // console.log(errorType);
    next({ status: 400, message: error.message.replace(/"/g, '') });
  }
};

module.exports = {
  validateUser: async (req, res, next) => {
    return await validate(userValidation, req.body, next);
  },

  validateVerifyEmail: async (req, res, next) => {
    return await validate(verifyEmail, req.body, next);
  },
};
