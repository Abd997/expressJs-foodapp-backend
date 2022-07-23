const e = require("express");
const jwt = require("jsonwebtoken");
const AdminRepo = require("../../repo/AdminRepo");
const UserRepo = require("../repo/UserRepo");
require("dotenv").config();
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, password } = req.body;
	try {
		var doc = await AdminRepo.authenticateUser(email, password);
		if (!doc) {
			return sendErrorResponse(res, 400, "User not found");
		}
	} catch (err) {
		return sendErrorResponse(res, 500, "Could not verify user");
	}
	try {
		var token = await jwt.sign(email, process.env.JWT_ADMIN);
	} catch (err) {
		return sendErrorResponse(
			res,
			500,
			"Could not create token for user"
		);
	}

	return res.json({
		msg: "User successfully authenticated",
		email: email,
		firstName: doc.firstName,
		token: token
	});
};
