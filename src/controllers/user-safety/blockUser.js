const e = require("express");
const UserCollection = require("../../collections/User");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { emailUserToBlock } = req.body;
	if (!emailUserToBlock) {
		throw new Error("Email of the user to block not sent");
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
		const { emailUserToBlock, email } = req.body;
		const user = await UserCollection.findOne({ email: email });
		/** @type {Array} */
		let blockedUsers = user.otherBlockedUsers;
		blockedUsers.push(emailUserToBlock);
		await UserCollection.updateOne(
			{ email: email },
			{
				otherBlockedUsers: blockedUsers
			}
		);
		return res.json({
			msg: "User has been blocked"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
