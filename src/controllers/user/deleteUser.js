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
	const { user } = req.body;

	try {
		const doc = await UserCollection.deleteOne({email: user.email});
		return res.status(400).json({ msg: "user account deleted successfully", data: doc});
	} catch (err) {
		return sendErrorResponse(
			res,
			500,
			err.message
		);
	}

	
};
