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
	const data = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		email: req.body.email
	};

	try {
		const doc = await UserCollection.create(data);
		if (!doc) {
			return sendErrorResponse(res, 400, "could not add user");
		}
		const token = jwt.sign(data.email, process.env.JWT_KEY);
		return res.json({
			msg: "New user has been added successfully",
			email: req.body.email,
			firstName: req.body.firstName,
			token: token
		});
	} catch (err) {
		return sendErrorResponse(res, 400, "could not add user");
	}
};
