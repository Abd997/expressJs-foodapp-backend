const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { user } = req.body;
        const { weight  } = req.body;
        const user_details = await UserCollection.findOne({ email: user.email });
        user_details.weight = weight;
        await user_details.save();
		res.json({success: true, message: "height updated successfully",weight: user_details.weight});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
