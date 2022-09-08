require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");
const UserCollection = require("../collections/User");
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
		const userEmail = await jwt.verify(token, process.env.JWT_KEY);
		const user = await UserCollection.findOne({
			email: userEmail
		});
		//console.log(user)
		if (!user) {
			throw new Error("User not registered");
		}
		req.body.email = userEmail;
		req.body.user = user;
		req.body.loggedInUser = user;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return sendErrorResponse(res, 400, "Token is invalid");
		}
		return sendErrorResponse(res, 400, error.message);
	}

	next();
};
