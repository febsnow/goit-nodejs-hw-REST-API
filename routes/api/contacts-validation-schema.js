const Joi = require('joi');
const mongoose = require('mongoose');

const addContactValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().min(2).max(30).optional(),

  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
}).or('name', 'email', 'phone');

const updateStatusContactValidation = Joi.object({
  favorite: Joi.boolean().required(),
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
  addContact: async (req, res, next) => {
    return await validate(addContactValidation, req.body, next);
  },
  updateContact: async (req, res, next) => {
    return await validate(updateContactValidation, req.body, next);
  },
  updateStatus: async (req, res, next) => {
    return await validate(updateStatusContactValidation, req.body, next);
  },
  // objectId: async (req, res, next) => {
  //   if (!mongoose.Types.ObjectId(req.params.id)) {
  //     return next({ status: 400, message: 'Invalid Object Id' });
  //   }
  //   next();
  // },
};
