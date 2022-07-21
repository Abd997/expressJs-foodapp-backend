const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserRepo = require("../repo/UserRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, firstName, lastName, password } = req.body;

	try {
		const doc = await UserRepo.findUser(email);
		if (doc) {
			return res.status(400).json({ msg: "User already exists" });
		}
	} catch (err) {
		return sendErrorResponse(
			res,
			500,
			"Could not check if user already exists"
		);
	}

	try {
		await UserRepo.registerUser(email, firstName, lastName, password);
	} catch (err) {
		return sendErrorResponse(res, 500, "Could not add user");
	}

	try {
		const token = jwt.sign(email, process.env.JWT_KEY);
		return res.status(201).json({
			msg: "New user has been added successfully",
			email: email,
			firstName: firstName,
			token: token
		});
	} catch (err) {
		return res.status(201).json({
			msg: "New user has been added successfully",
			email: email,
			firstName: firstName
		});
	}
};
