const joi = require('joi');

module.exports.register = {
  body: {
    email: joi.string().email().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    password: joi.string().alphanum().min(3).max(30)
      .required(),
  },
};

module.exports.login = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(3).max(30)
      .required(),
  },
};
