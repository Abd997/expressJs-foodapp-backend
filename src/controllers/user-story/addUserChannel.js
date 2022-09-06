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
				"User is not allowed to post channel"
			);
		}
		
		await uploadToAzure(req);
		const user_details = await UserCollection.findOne(
			{ email: user.email }
		);
		user_details.channels.push({title: req.body.title, coverUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`,videoUrl: req.body.videoUrl,channelType: req.body.channelType})
		await user_details.save();
		res.json({ msg: "Story uploaded successfully" ,channels: user_details.channels});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
