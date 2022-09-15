const e = require("express");
const UserCollection = require("../../collections/User");
const UserPosts = require("../../collections/UserPosts");
const uploadToAzure = require("../../utils/uploadToAzure");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
        const {postId} = req.params
		const doc = await UserCollection.findOne({
			email: req.body.email
		});
		const newPost = await UserPosts.deleteOne({ _id:postId});
		doc.postIds.pop(postId);
        await doc.save();
		return res.json({ msg: "Post deleted successfully", data: newPost });
	} catch (error) {
		console.log(error);
		sendErrorResponse(res, 500, error);
	}
};
