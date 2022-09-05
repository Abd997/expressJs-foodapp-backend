const e = require("express");
const jwt = require("jsonwebtoken");
const UserCollection = require("../../collections/User");
require("dotenv").config();
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const bcrypt = require("bcrypt");

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
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		await UserCollection.create({
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: hashPassword
		});
	} catch (err) {
		return sendErrorResponse(res, 500, "Could not add user");
	}

	try {
		const token = jwt.sign(email, process.env.JWT_KEY);
		const user = await UserRepo.findUser(email)

		return res.status(201).json({
			msg: "New user has been added successfully",
			id: user._id,
			email:  user.email,
			firstName:  user.firstName,
			token:  token
		});
	} catch (err) {
		return res.status(201).json({
			msg: "New user has been added successfully",
			email: email,
			firstName: firstName
		});
	}
};
