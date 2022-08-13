require("dotenv").config();
const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const uploadToAzure = require("../../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		await uploadToAzure(req);
		await UserCollection.updateOne(
			{ email: email },
			{
				profileImageUrl: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`
			}
		);
		return res.json({
			msg: "User avatar has been updated"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
