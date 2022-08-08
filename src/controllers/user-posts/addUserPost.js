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
		if (req.file) {
			await uploadToAzure(req);
		}
		const doc = await UserCollection.findOne({
			email: req.body.email
		});
		/** @type {Array<number>} */
		const postIds = doc.postIds;
		const newPost = await UserPosts.create({
			email: req.body.email,
			imageUrl: req.file
				? `https://foodappstorageaccount.blob.core.windows.net/container/${req.file.filename}`
				: "empty",
			description: req.body.description,
			title: req.body.title
		});
		postIds.push(newPost._id);

		await UserCollection.updateOne(
			{ email: req.body.email },
			{
				postIds: postIds
			}
		);
		return res.json({ msg: "Post uploaded successfully" });
	} catch (error) {
		console.log(error);
		sendErrorResponse(res, 500, error);
	}
};
