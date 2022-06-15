const { body } = require("express-validator");

const LoginUserValidation = [
  body("email").isEmail(),
  body("gender").exists({ checkFalsy: true }),
  body("weight").exists({ checkFalsy: true }),
  body("weightGoal").exists({ checkFalsy: true }),
  body("currentActivityLevel").exists({ checkFalsy: true }),
  body("dateOfBirth").exists({ checkFalsy: true }),
  body("height").exists({ checkFalsy: true }),
];

module.exports = LoginUserValidation;
