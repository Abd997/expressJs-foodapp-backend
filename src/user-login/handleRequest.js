const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserCollection = require("../models/User");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const doc = await UserCollection.findOne({
		email: req.body.email,
		password: req.body.password
	});

	if (!doc) {
		return sendErrorResponse(res, 400, "user not found");
	}

	const token = await jwt.sign(req.body.email, process.env.JWT_KEY);

	return res.json({
		msg: "user has successfully authenticated",
		email: req.body.email,
		firstName: doc.firstName,
		token: token
	});
};
