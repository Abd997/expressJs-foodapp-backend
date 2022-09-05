const e = require("express");
const UserCollection = require("../collections/User");
const { BadRequestError } = require("../custom-error");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { user } = req.body;
		const user_details = await UserCollection.findOne({
			email: user.email
		});
		

		/* Returning the response to the client. */
		return res.json({
			msg: "User successfully authenticated",
			data: {
				id: user_details._id,
				firstName: user_details.firstName,
				lastName: user_details.lastName,
				email: user_details.email,
				isAmbassador: user_details.isAmbassador,
				profileImageUrl: user_details.profileImageUrl,
				gender: user_details.gender,
				weight: user_details.weight,
				weightGoal: user_details.weightGoal,
				height: user_details.height,
				bmi: user_details.bmi,
				calories: user_details.calories,
				water: user_details.water,
				steps: user_details.steps,
				food: user_details.food,
				loginStreak: user_details.loginStreak,
				bestStreak: user_details.bestStreak,
			}
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
