const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { postId } = req.params;
	if (!postId) {
		throw new Error("Post id not sent");
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
		const { postId } = req.params;
		const post = await UserPosts.findById(postId);
		const comments = post.comments;
		return res.json({
			totalComments: post.totalComments,
			data: comments
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
