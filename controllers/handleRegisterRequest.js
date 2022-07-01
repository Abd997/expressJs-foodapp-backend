const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserCollection = require("../models/User");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleRegisterRequest = async (req, res) => {
	const data = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		email: req.body.email
	};

	try {
		const doc = await UserCollection.create(data);
		if (!doc) {
			return res
				.status(400)
				.send({ msg: "could not add user", err: err });
		}
		const token = jwt.sign(data.email, process.env.JWT_KEY);
		return res.json({
			msg: "New user has been added successfully",
			token: token
		});
	} catch (err) {
		res.status(400).send({ msg: "could not add user", err: err });
	}
	// res.send("work");
};

module.exports = handleRegisterRequest;
