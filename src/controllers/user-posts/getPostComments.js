const e = require("express");
const UserCollection = require("../../collections/User");
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
		if (!post) {
			throw new Error("Post does not exists");
		}
		const postUser = await UserCollection.findOne({
			email: post.email
		});
		const comments = post.comments;
		return res.json({
			totalComments: post.totalComments,
			data: comments,
			avatar: postUser.profileImageUrl
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
