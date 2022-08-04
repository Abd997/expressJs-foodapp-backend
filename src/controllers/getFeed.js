const e = require("express");
const UserPosts = require("../collections/UserPosts");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { email } = req.params;
	if (!email) {
		throw new Error("Email not sent");
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
		const { email } = req.params;
		const data = await UserPosts.find({}).sort({ dateUpdated: -1 });
		return res.json({
			data
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
