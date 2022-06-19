const { body } = require("express-validator");

module.exports = [
  body("email").isEmail(),
  body("password").exists({ checkFalsy: true }),
];
