const { body } = require("express-validator");
const checkExpressValidator = require("../../utils/checkExpressValidator");

module.exports = [
	body("weekNumber").exists({ checkFalsy: true }),
	checkExpressValidator
];
