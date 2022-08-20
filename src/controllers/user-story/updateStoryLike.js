const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
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
		const { loggedInUser, storyUserEmail } = req.body;
		if (!storyUserEmail) {
			throw new BadRequestError("Story user email not sent");
		}
		// check user story exists
		const storyUser = await UserCollection.findOne({
			email: storyUserEmail
		});
		if (!storyUser) {
			throw new BadRequestError("Story user does not exists");
		}
		// check if user has a posted story
		if (!storyUser.hasPostedStory) {
			throw new BadRequestError("User has not posted any story");
		}

		/** @type {Array} */
		const storyLikes = storyUser.storyLikes;
		let msg = "",
			storyLikedByUser = false;

		for (let index = 0; index < storyLikes.length; index++) {
			const element = storyLikes[index];
			if (element === loggedInUser.email) {
				// unlike the story
				storyLikedByUser = true;
				storyLikes.splice(index, 1);
				msg = "User has unliked the story";
				break;
			}
		}

		if (!storyLikedByUser) {
			// like the story
			storyLikes.push(loggedInUser.email);
			msg = "User has liked the story";
		}

		await UserCollection.updateOne(
			{ email: storyUser.email },
			{
				storyLikes: storyLikes
			}
		);

		res.json({
			msg: msg
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
