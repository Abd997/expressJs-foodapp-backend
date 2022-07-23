const { body } = require("express-validator");
const checkExpressValidator = require("../utils/checkExpressValidator");

module.exports = [
	body("email").isEmail().withMessage("Email is invalid"),
	body("weekNumber").exists({ checkFalsy: true }),
	checkExpressValidator
];
