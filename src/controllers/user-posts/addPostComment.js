const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { postId, comment } = req.body;
	if (!postId) {
		throw new Error("Post id not sent");
	} else if (!comment) {
		throw new Error("Comment not sent");
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
		const { postId, email, comment} = req.body;
		const NewComment = {
			email: email,
			comment: comment,
			dateCreated: Date.now(),
			dateUpdated: Date.now()
		};

		const post = await UserPosts.findById(postId);
		post.totalComments += 1;
		post.comments.push(NewComment);
		await post.save();

		res.json({
			msg: "Comment added to post"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
