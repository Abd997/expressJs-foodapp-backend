const e = require("express");
const UserCollection = require("../../collections/User");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { emailReportedUser } = req.body;
	if (!emailReportedUser) {
		throw new Error("Email of the user to be reported not sent");
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		const { emailReportedUser, email } = req.body;
		const user = await UserCollection.findOne({
			email: emailReportedUser
		});
		if (!user) {
			throw new Error("User to report does not exist");
		}
		await UserCollection.updateOne(
			{ email: emailReportedUser },
			{
				totalReportsByOtherUser: user.totalReportsByOtherUser++
			}
		);
		return res.json({
			msg: "User has been reported"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
