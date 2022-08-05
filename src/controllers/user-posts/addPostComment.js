const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { postId, title, description } = req.body;
	if (!postId) {
		throw new Error("Post id not sent");
	} else if (!title) {
		throw new Error("Title not sent");
	} else if (!description) {
		throw new Error("Description not sent");
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
		const { postId, email, title, description } = req.body;
		const comment = {
			email: email,
			title: title,
			description: description,
			dateCreated: Date.now(),
			dateUpdated: Date.now()
		};
		const post = await UserPosts.findById(postId);
		/** @type {Array} */
		const comments = post.comments;
		let totalComments = post.totalComments;
		totalComments++;
		comments.push(comment);
		await UserPosts.updateOne(
			{ _id: postId },
			{
				comments: comments,
				totalComments: totalComments
			}
		);
		res.json({
			msg: "Comment added to post"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
