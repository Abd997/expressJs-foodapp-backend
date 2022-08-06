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
		// console.log(req.body.email);
		await uploadToAzure(req);
		const doc = await UserCollection.findOne({
			email: req.body.email
		});
		/** @type {Array<number>} */
		const postIds = doc.postIds;
		const newPost = await UserPosts.create({
			email: req.body.email,
			imageUrl: `https://foodappstorageaccount.blob.core.windows.net/container/${req.file.filename}`,
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
		res.json({ msg: "Post uploaded successfully" });
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
