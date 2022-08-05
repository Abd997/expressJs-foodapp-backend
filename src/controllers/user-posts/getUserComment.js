const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { commentId } = req.params;
	if (!commentId) {
		throw new Error("Comment id not sent");
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
		const { commentId } = req.params;
		const comment = await UserPosts.find({
			"comments._id": commentId
		});
		return res.json({
			data: comment
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
