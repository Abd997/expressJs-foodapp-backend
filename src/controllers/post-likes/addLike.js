/**
 * Check if a user has already liked the post
 * If yes return that message
 * If not then like the post by that user
 */
const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { email } = req.body;
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
		const { email } = req.body;
		const hasUserLiked = await UserPosts.findOne({ email: email });
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
