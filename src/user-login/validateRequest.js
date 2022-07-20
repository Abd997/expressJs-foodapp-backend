const { body } = require("express-validator");
const checkExpressValidator = require("../utils/checkExpressValidator");

module.exports = [
	body("email").isEmail(),
	body("password").exists({ checkFalsy: true }),
	checkExpressValidator
];
