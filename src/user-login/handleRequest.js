const e = require("express");
const jwt = require("jsonwebtoken");
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
		const doc = await UserRepo.findUser(email, password);
		if (!doc) {
			return sendErrorResponse(res, 400, "User not found");
		}
		const token = await jwt.sign(req.body.email, process.env.JWT_KEY);

		return res.json({
			msg: "User successfully authenticated",
			email: req.body.email,
			firstName: doc.firstName,
			token: token
		});
	} catch (err) {
		return sendErrorResponse(res, 500, "Could not verify user");
	}
};
