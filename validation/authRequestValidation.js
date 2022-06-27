const { body } = require("express-validator");
const {
	verifyToken,
	checkExpressValidatorErrors
} = require("../middlewares");
const UserCollection = require("../models/User");

module.exports = [
	body("email").isEmail(),
	body("email").custom((value) => {
		return UserCollection.findOne({ email: value })
			.then((user) => {
				if (!user) {
					return Promise.reject("User not registered");
				}
			})
			.catch((err) => {
				return Promise.reject("User not registered");
			});
	}),
	checkExpressValidatorErrors,
	verifyToken
];
