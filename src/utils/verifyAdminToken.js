const e = require("express");
const jwt = require("jsonwebtoken");
const AdminCollection = require("../collections/Admin");
const { BadRequestError } = require("../custom-error");
require("dotenv").config();
const sendErrorResponse = require("./sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
module.exports = async (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return sendErrorResponse(
			res,
			400,
			"No authorization header present"
		);
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return sendErrorResponse(res, 400, "Token not sent");
	}

	try {
		const email = await jwt.verify(token, process.env.JWT_ADMIN);
		const admin = await AdminCollection.findOne({ email: email });
		if (!admin) {
			throw new BadRequestError("Admin is not registered");
		}
		req.body.email = email;
		req.body.admin = admin;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return sendErrorResponse(res, 400, "Token is invalid");
		} else if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, "Could not verify token");
	}

	next();
};
