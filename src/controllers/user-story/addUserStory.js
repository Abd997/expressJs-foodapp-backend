require("dotenv").config();
const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadToAzure = require("../../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async function (req, res) {
	try {
		const { user } = req.body;
		if (!user.isAmbassador) {
			throw new BadRequestError(
				"User is not allowed to post stories"
			);
		}
		if (user.hasPostedStory) {
			throw new BadRequestError("User has already posted a story");
		}
		await uploadToAzure(req);
		await UserCollection.updateOne(
			{ email: user.email },
			{
				hasPostedStory: true,
				storyUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`
			}
		);
		res.json({ msg: "Story uploaded successfully" });
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
