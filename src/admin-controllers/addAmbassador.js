const e = require("express");
const UserCollection = require("../collections/User");
const { BadRequestError } = require("../custom-error");
const sendErrorResponse = require("../utils/sendErrorResponse");
const bcrypt = require("bcrypt");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { userEmail, firstName, lastName, password } = req.body;
	if (!userEmail) {
		throw new BadRequestError("Email not sent");
	} else if (!firstName) {
		throw new BadRequestError("First name not sent");
	} else if (!lastName) {
		throw new BadRequestError("Last name not sent");
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
		const { userEmail, firstName, lastName, password } = req.body;
		const user = await UserCollection.findOne({ email: userEmail });
		if (user) {
			throw new BadRequestError("Ambassador is already registered");
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		await UserCollection.create({
			email: userEmail,
			firstName: firstName,
			lastName: lastName,
			password: hashPassword,
			isAmbassador: true
		});
		return res.json({ msg: "Ambassador has been created" });
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
