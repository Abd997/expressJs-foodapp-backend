const { body } = require("express-validator");

const LoginUserValidation = [
  body("email").isEmail(),
  body("password").exists({ checkFalsy: true }),
];

module.exports = LoginUserValidation;
