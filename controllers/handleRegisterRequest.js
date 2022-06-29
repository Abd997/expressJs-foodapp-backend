const e = require("express");
const UserCollection = require("../models/User");
const validateRequest = require("../middlewares/checkExpressValidatorErrors");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleRegisterRequest = (req, res) => {
	validateRequest(req, res);

	const data = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		email: req.body.email
	};

	UserCollection.create(data, function (err, result) {
		if (err) {
			return res
				.status(400)
				.send({ msg: "could not add user", err: err });
		} else {
			return res.send("New user has been added successfully");
		}
	});
};

module.exports = handleRegisterRequest;
