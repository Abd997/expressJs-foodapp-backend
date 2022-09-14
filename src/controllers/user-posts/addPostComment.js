const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const { androidPushNotification } = require("../../utils/sendNotification");

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
		const { postId, email, comment } = req.body;
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

		const postAdmin = await UserCollection.findOne({ email: post.email })
		const adminDeviceToken = postAdmin.deviceToken;

		const user = await UserCollection.findOne({ email: email });
		const notification = await androidPushNotification(adminDeviceToken, {
			title: user.firstName + ' ' + user.lastName,
			body: "Has liked your post."
		})
		return res.json({ msg: "User Comment Added", notification: notification ? "Notification sent successfully" : "Notification not sent successfully" });
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
