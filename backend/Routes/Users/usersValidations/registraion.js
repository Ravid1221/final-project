const Joi = require("Joi");

function validateRegistration(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(user);
}

function validateResetPassword(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    newPassword: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = { validateRegistration, validateResetPassword };
