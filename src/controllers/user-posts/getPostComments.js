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
		console.log('POST', postId);
		const post = await UserPosts.findById({_id:postId});
		if (!post) {
			throw new Error("Post does not exists");
		}
		console.log('POST', post);
		const postUser = await UserCollection.findOne({
			email: post.email
		});
		/** @type{Array} */
		const comments = post.comments;
		let commentData = [];
		console.log('POST', comments[0].email);
		for (let i = 0; i < comments.length; i++) {
			let comment = comments[i];
			let commentUser = await UserCollection.findOne({
				email: comment["email"]
			});
			commentData.push({
				postId: post._id,
				userId: commentUser._id,
				time: comment.dateUpdated,
				comment: comment.comment,
				username: commentUser.firstName,
				profileImageUrl: commentUser.profileImageUrl
			});
		}
		return res.json({
			totalComments: post.totalComments,
			comments: commentData
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
