const e = require("express");
const AdminCollection = require("../../collections/Admin");
const ChannelCollection = require("../../collections/Channel");
const BadRequestError = require("../../custom-error/BadRequestError");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { loggedInUser } = req.body;
		const data = await ChannelCollection.find({}).select("title coverUrl videoUrl channelType")
        return res.status(200).json({status: true, data: data});
	} catch (error) {
		if (error instanceof BadRequestError) {
			sendErrorResponse(res, error.statusCode, error.message);
		}
		sendErrorResponse(res, 500, error.message);
	}
};
