const e = require("express");
const jwt = require("jsonwebtoken");
const AdminCollection = require("../../collections/Admin");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadToAzure = require("../../utils/uploadToAzure");
const verifyAdminToken = require("../../utils/verifyAdminToken");
require("dotenv").config();

module.exports = async (req, res) => {
	try {
        const {email} = req.body;
		const admin = await AdminCollection.findOne({ email: email }).populate("stories")
		if (!admin) {
			throw new BadRequestError("Admin is not registered");
		}
		res.json({
			msg: "story has been found",
			stories: admin.stories,
            channels: admin.channels,
            name: admin.firstName,
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
