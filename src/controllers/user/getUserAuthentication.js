require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");
const UserCollection = require("../../collections/User");
const BadRequestError = require("../../custom-error/BadRequestError");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserCollection.findOne({
			email: email,
			password: password
		});
		if (!user) {
			throw new BadRequestError("User not registered");
		}
		const token = await jwt.sign(email, process.env.JWT_KEY);
		return res.json({
			msg: "User successfully authenticated",
			email: email,
			firstName: user.firstName,
			token: token
		});
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return sendErrorResponse(
				res,
				500,
				"Could not create token for user"
			);
		} else if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
