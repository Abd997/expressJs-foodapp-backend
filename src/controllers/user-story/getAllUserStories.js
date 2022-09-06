const e = require("express");
const UserCollection = require("../../collections/User");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		let stories = [];
		const ambassadors = await UserCollection.find({
			isAmbassador: true,
		});

		for (let i = 0; i < ambassadors.length; i++) {
			stories.push({
				stories: ambassadors[i].stories,
				channels: stories[i].channels,
				email: ambassadors[i].email,
				profileImageUrl: ambassadors[i].profileImageUrl,
				username: ambassadors[i].firstName
			});
		}

		return res.json({
			stories: stories
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
