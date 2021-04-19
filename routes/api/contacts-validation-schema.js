const Joi = require('joi');

const addContactValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .length(14)
    .pattern(/^\(\d{3}\)\d{3}-\d{2}-\d{2}$/)
    .required(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),

  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string()
    .length(14)
    .pattern(/^\(\d{3}\)\d{3}-\d{2}-\d{2}$/)
    .optional(),
}).or('name', 'email', 'phone');

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (error) {
    console.log(error);
    next({ status: 400, message: error.message.replace(/"/g, '') });
  }
};

module.exports = {
  addContact: async (req, res, next) => {
    return await validate(addContactValidation, req.body, next);
  },
  updateContact: async (req, res, next) => {
    return await validate(updateContactValidation, req.body, next);
  },
};
