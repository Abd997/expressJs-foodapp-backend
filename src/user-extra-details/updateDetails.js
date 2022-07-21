const e = require("express");
const UserRepo = require("../repo/UserRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const doc = await UserRepo.updateUser({
			email: req.body.email,
			gender: req.body.gender,
			weight: req.body.weight,
			weightGoal: req.body.weightGoal,
			currentActivityLevel: req.body.currentActivityLevel,
			dateOfBirth: req.body.dateOfBirth,
			height: req.body.height
		});
		if (!doc) {
			return sendErrorResponse(res, 500, "Could not update user");
		}
	} catch (err) {
		return sendErrorResponse(res, 500, "Could not update user");
	}
	return res.send({ msg: "User updated successfully" });
};
