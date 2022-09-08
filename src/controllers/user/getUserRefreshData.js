const e = require("express");
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
        const { user } = req.body;

		
		res.json({
			data: { 
				id: loggedInUser._id,
				firstName: loggedInUser.firstName,
				lastName: loggedInUser.lastName,
				email: loggedInUser.email,
				isAmbassador: loggedInUser.isAmbassador,
				profileImageUrl: loggedInUser.profileImageUrl,
				gender: loggedInUser.gender,
				weight: loggedInUser.weight,
				weightGoal: loggedInUser.weightGoal,
				height: loggedInUser.height,
				bmi: loggedInUser.bmi,
				calories: loggedInUser.calories,
				water: loggedInUser.water,
				steps: loggedInUser.steps,
				food: loggedInUser.food,
				loginStreak: loggedInUser.loginStreak,
				bestStreak: loggedInUser.bestStreak,
				nutritions: loggedInUser.nutritions, 
			}
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			sendErrorResponse(res, error.statusCode, error.message);
		}
		sendErrorResponse(res, 500, error.message);
	}
};
