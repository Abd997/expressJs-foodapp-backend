require("dotenv").config();
const e = require("express");
const AdminCollection = require("../../collections/Admin");
const ChannelCollection = require("../../collections/Channel");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadMultipleToAzure = require("../../utils/uploadMultipleToAzure");
const uploadToAzure = require("../../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async function (req, res) {
	try {
		const { email } = req.body;
		await uploadMultipleToAzure(req);
		
		const admin = await AdminCollection.findOne(
			{ email: email }
		);

		const data = await ChannelCollection.create({username: admin.firstName+" "+admin.lastName,email: admin.email, profileImageUrl: admin.profileImageUrl,title: req.body.title, coverUrl:`${process.env.AZURE_CONTAINER_URL}/${req.files.image[0].filename}` ,videoUrl: `${process.env.AZURE_CONTAINER_URL}/${req.files.video[0].filename}`,channelType: req.body.channelType})
		
		res.json({ msg: "Story uploaded successfully" ,channels: data});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
