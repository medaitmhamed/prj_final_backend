// order.validator.js
const Joi = require('joi');
const mongoose = require('mongoose');

// Helper to validate ObjectId
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const orderItemSchema = Joi.object({
  productId: Joi.string().custom(objectId).required().messages({
    'any.invalid': 'Invalid product ID',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required(),
});

const orderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
});


module.exports = orderSchema;
