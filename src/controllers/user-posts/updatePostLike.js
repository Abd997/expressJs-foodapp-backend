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
	const { email, postId } = req.body;
	if (!email) {
		throw new Error("Email not sent");
	} else if (!postId) {
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
		const { email, postId } = req.body;
		let post = await UserPosts.findOne({
			_id: postId
		});
		if (!post) {
			throw new Error("Post does not exists");
		}
		/** @type {Array<string>} */
		const likedUsers = post.likedBy;
		let totalLikes = post.totalLikes;
		const ind = likedUsers.findIndex((e) => e === email);
		if (ind >= 0) {
			likedUsers.splice(ind, 1);
			totalLikes--;
			await UserPosts.updateOne(
				{ _id: postId },
				{ likedBy: likedUsers, totalLikes: totalLikes }
			);

			return res.json({ msg: "User like removed" });
		} else {
			likedUsers.push(email);
			totalLikes++;
			await UserPosts.updateOne(
				{ _id: postId },
				{ likedBy: likedUsers, totalLikes: totalLikes }
			);

			return res.json({ msg: "User like added" });
		}
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
