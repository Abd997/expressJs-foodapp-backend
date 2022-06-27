const e = require("express");
const UserCollection = require("../models/User");
const validateRequest = require("../middlewares/checkExpressValidatorErrors");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleExtraDetailsRequest = async (req, res) => {
	validateRequest(req, res);
	const doc = await UserCollection.findOneAndUpdate(
		{ email: req.body.email },
		{
			gender: req.body.gender,
			weight: req.body.weight,
			weightGoal: req.body.weightGoal,
			currentActivityLevel: req.body.currentActivityLevel,
			dateOfBirth: req.body.dateOfBirth,
			height: req.body.height
		}
	);
	if (!doc) {
		return res.status(400).send({ error: "user not found" });
	}
	return res.send("user details updated successfully");
};

module.exports = handleExtraDetailsRequest;
