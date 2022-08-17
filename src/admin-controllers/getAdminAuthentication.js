require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../custom-error");
const AdminRepo = require("../repo/AdminRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");
const cookieParser = require("cookie-parser");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { email, password } = req.body;
	if (!email) {
		throw new BadRequestError("Email not sent");
	} else if (!password) {
		throw new BadRequestError("Password not sent");
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		const { email, password } = req.body;
		var doc = await AdminRepo.authenticateUser(email, password);
		if (!doc) {
			throw new BadRequestError("Admin not found");
		}
		var token = await jwt.sign(email, process.env.JWT_ADMIN);
		return res.json({
			msg: "Admin successfully authenticated",
			token: token
		});
	} catch (error) {
		return sendErrorResponse(res, error.statusCode, error.message);
	}
};
