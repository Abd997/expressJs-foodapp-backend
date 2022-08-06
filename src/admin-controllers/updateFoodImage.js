const e = require("express");
const sendErrorResponse = require("../utils/sendErrorResponse");
const uploadToAzure = require("../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await uploadToAzure("foodimages");
	} catch (error) {
		return sendErrorResponse(res, 500, "Could not upload food image");
	}
	res.send("working");
};
