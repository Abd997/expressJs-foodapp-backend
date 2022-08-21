const e = require("express");
const UserCollection = require("../collections/User");
const UserRepo = require("../repo/UserRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		let {
			email,
			gender,
			weight,
			weightGoal,
			dateOfBirth,
			currentActivityLevel,
			height
		} = req.body;

		weight = Number(weight);
		height = Number(height);

		let dietMeasurement;

		const genderFactor = gender === "male" ? 1 : 0.9;
		let currentActivityLevelFactor, weightGoalFactor;

		if (currentActivityLevel === "very low activity") {
			currentActivityLevelFactor = 1.3;
		} else if (currentActivityLevel === "light activity") {
			currentActivityLevelFactor = 1.55;
		} else if (currentActivityLevel === "moderate activity") {
			currentActivityLevelFactor = 1.65;
		} else if (currentActivityLevel === "high activity") {
			currentActivityLevelFactor = 1.8;
		}

		if (weightGoal === "fat loss") {
			weightGoalFactor = 0.9;
		} else if (weightGoal === "maintenance") {
			weightGoalFactor = 1;
		} else if (weightGoal === "muscle gain") {
			weightGoalFactor = 1.2;
		}

		const heightInMeter = height / 100;
		const bmi = parseInt(weight / (heightInMeter * heightInMeter));
		const caloriesRequired =
			genderFactor *
			currentActivityLevelFactor *
			24 *
			weight *
			weightGoalFactor;

		dietMeasurement = {
			caloriesRequired: caloriesRequired,
			caloriesTaken: 0,
			carbsRequired: 0.6 * caloriesRequired,
			carbsTaken: 0,
			fatsRequired: 0.25 * caloriesRequired,
			fatsTaken: 0,
			proteinRequired: 0.15 * caloriesRequired,
			proteinTaken: 0,
			waterRequired: caloriesRequired,
			waterTaken: 0,
			movementSteps: 0,
			bmi: bmi
		};

		const doc = await UserCollection.updateOne(
			{ email: email },
			{
				gender: gender,
				weight: weight,
				weightGoal: weightGoal,
				currentActivityLevel: currentActivityLevel,
				dateOfBirth: dateOfBirth,
				height: height,
				dietMeasurement: dietMeasurement
			}
		);
		return res.send("User details updated successfully");
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
	return res.send({ msg: "User updated successfully" });
};
