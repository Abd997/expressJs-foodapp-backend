const e = require("express");
const UserRepo = require("../repo/UserRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email } = req.body;
	try {
		var doc = await UserRepo.findUser(email);
		if (!doc) {
			return sendErrorResponse(res, 500, "Could not find user");
		}
	} catch (err) {
		return sendErrorResponse(res, 500, "Could not find user");
	}
	return res.send({
		msg: "Details sent successfully",
		data: doc._doc
	});
};
