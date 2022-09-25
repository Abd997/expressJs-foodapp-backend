const e = require("express");
const jwt = require("jsonwebtoken");
const AdminCollection = require("../../collections/Admin");
const StoryCollection = require("../../collections/Story");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadToAzure = require("../../utils/uploadToAzure");
const verifyAdminToken = require("../../utils/verifyAdminToken");
require("dotenv").config();

module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		const admin = await AdminCollection.findOne({ email: email });
		if (!admin) {
			throw new BadRequestError("Admin is not registered");
		}
		await uploadToAzure(req);

		if (req.body.caption) {
			const story = await StoryCollection.create({ username: admin.firstName+" "+admin.lastName,email: admin.email, profileImageUrl: admin.profileImageUrl, storyUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`, caption: req.body.caption })
			
		}
		else {
			const story = await StoryCollection.create({ username: admin.firstName+" "+admin.lastName,email: admin.email, profileImageUrl: admin.profileImageUrl, storyUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}` })
		
		}


		res.json({
			msg: "story has been added",
			stories:  await StoryCollection.find({ email: email })
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
