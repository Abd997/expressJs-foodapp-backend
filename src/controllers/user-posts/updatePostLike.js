const e = require("express");
const UserCollection = require("../../collections/User");
const UserPosts = require("../../collections/UserPosts");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const { androidPushNotification } = require("../../utils/sendNotification");

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

			await UserCollection.findByIdAndUpdate({_id:req.body.loggedInUser._id.toString()},{$pull:{likedPosts:postId.toString()}})
			
			return res.json({ msg: "User like removed" });
		} else {
			likedUsers.push(email);
			totalLikes++;
			await UserPosts.updateOne(
				{ _id: postId },
				{ likedBy: likedUsers, totalLikes: totalLikes }
			);
			await UserCollection.findByIdAndUpdate({_id:req.body.loggedInUser._id.toString()},{$push:{likedPosts:postId}})

			const postAdmin = await UserCollection.findOne({email: post.email})
			const adminDeviceToken = postAdmin.deviceToken;

			const user = await UserCollection.findOne({email: email});
			const notification = await androidPushNotification(adminDeviceToken, {
				title: user.firstName + ' ' + user.lastName ,
				body: "Has liked your post."
			})
			return res.json({ msg: "User like added", notification: notification? "Notification sent successfully": "Notification not sent successfully"});
		}
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
