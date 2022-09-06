require("dotenv").config();
const e = require("express");
const AdminCollection = require("../../collections/Admin");
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
		const { email } = req.body;
		
		await uploadToAzure(req);
		const admin_details = await AdminCollection.findOne(
			{ email: email }
		);
		admin_details.channels.push({title: req.body.title, coverUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`,videoUrl: req.body.videoUrl,channelType: req.body.channelType})
		await admin_details.save();
		res.json({ msg: "Story uploaded successfully" ,channels: admin_details.channels});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
