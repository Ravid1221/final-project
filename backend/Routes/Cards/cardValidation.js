const Joi = require("joi");

function validateCard(card) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(2000).required(),
    image: Joi.string().min(1).max(1024),
    alt: Joi.string().min(2).max(256),
    ingredients: Joi.array().min(1).max(1000),
    steps: Joi.array().min(1).max(1000),
  });
  return schema.validate(card);
}

exports.validateCard = validateCard;
