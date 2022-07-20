const { body } = require("express-validator");
const checkExpressValidator = require("../utils/checkExpressValidator");

module.exports = [
	body("email").isEmail().withMessage("Email is invalid"),
	body("firstName").exists({ checkFalsy: true }),
	body("lastName").exists({ checkFalsy: true }),
	body("password").exists({ checkFalsy: true }),
	checkExpressValidator
];
