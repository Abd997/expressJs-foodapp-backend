const e = require("express");
const AdminCollection = require("../../collections/Admin");
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
		const data = await AdminCollection.find({}).select("firstName lastName email stories channels").populate("stories")
        return res.status(200).json({status: true, data: data});
	} catch (error) {
		if (error instanceof BadRequestError) {
			sendErrorResponse(res, error.statusCode, error.message);
		}
		sendErrorResponse(res, 500, error.message);
	}
};
