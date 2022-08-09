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
			hasPostedStory: true
		});

		for (let i = 0; i < ambassadors.length; i++) {
			stories.push({
				storyUrl: ambassadors[i].storyUrl,
				email: ambassadors[i].email
			});
		}

		return res.json({
			stories: stories
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
