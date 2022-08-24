const e = require("express");
const UserCollection = require("../../collections/User");
const UserPosts = require("../../collections/UserPosts");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 * Check if a user has already liked the post
 * If yes return that message
 * If not then like the post by that user
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { postId } = req.body;
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
		const { email, postId } = req.body;
		let post = await UserPosts.findById(postId);
		if (!post) {
			throw new BadRequestError("Post does not exists");
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

			await UserCollection.findByIdAndUpdate({_id:req.body.loggedInUser._id.toString()},{$push:{likedPosts:postId}})
			return res.json({ msg: "User like removed" });
		} else {
			likedUsers.push(email);
			totalLikes++;
			await UserPosts.updateOne(
				{ _id: postId },
				{ likedBy: likedUsers, totalLikes: totalLikes }
			);

			await UserCollection.findByIdAndUpdate({_id:req.body.loggedInUser._id.toString()},{$push:{likedPosts:postId}})
			return res.json({ msg: "User like added" });
		}
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
