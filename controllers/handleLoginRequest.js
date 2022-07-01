const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserCollection = require("../models/User");
const validateRequest = require("../middlewares/checkValidationErrors");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleLoginRequest = async (req, res) => {
	const doc = await UserCollection.findOne({
		email: req.body.email,
		password: req.body.password
	});

	if (!doc) {
		return res.status(400).send("user not found");
	}

	const token = await jwt.sign(req.body.email, process.env.JWT_KEY);

	return res.json({
		msg: "user has successfully authenticated",
		email: req.body.email,
		firstName: req.body.firstName,
		token: token
	});
};

module.exports = handleLoginRequest;
