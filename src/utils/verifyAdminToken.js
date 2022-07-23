const e = require("express");
const jwt = require("jsonwebtoken");
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
		await jwt.verify(token, process.env.JWT_ADMIN);
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			return sendErrorResponse(res, 400, "Token is invalid");
		}
		return sendErrorResponse(res, 500, "Could not verify token");
	}

	next();
};
