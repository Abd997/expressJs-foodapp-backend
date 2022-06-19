const { body } = require("express-validator");

module.exports = [
  body("email").isEmail(),
  body("userStory").exists({ checkFalsy: true }),
];
