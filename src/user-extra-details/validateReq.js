const { body } = require("express-validator/src");
const checkExpressValidator = require("../utils/checkExpressValidator");

module.exports = [
	body("email").isEmail().withMessage("Email is invalid"),
	body("gender").exists({ checkFalsy: true }),
	body("weight").exists({ checkFalsy: true }),
	body("weightGoal").exists({ checkFalsy: true }),
	body("currentActivityLevel").exists({ checkFalsy: true }),
	body("dateOfBirth").exists({ checkFalsy: true }),
	body("height").exists({ checkFalsy: true }),
	checkExpressValidator
];
