const { body } = require("express-validator");

const NewUserValidation = [
  body("email").isEmail(),
  body("firstName").exists({ checkFalsy: true }),
  body("lastName").exists({ checkFalsy: true }),
];

module.exports = NewUserValidation;
