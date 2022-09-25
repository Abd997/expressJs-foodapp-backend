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
			const story = await StoryCollection.create({ storyUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`, caption: req.body.caption })
			admin.stories.push(story["_id"]);
			await admin.save();
		}
		else {
			const story = await StoryCollection.create({ storyUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}` })
			admin.stories.push(story["_id"]);
			await admin.save();
		}


		res.json({
			msg: "story has been added",
			stories:  await AdminCollection.findOne({ email: email }).populate("stories")
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
