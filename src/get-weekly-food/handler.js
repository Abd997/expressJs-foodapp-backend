const e = require("express");
const FoodRepo = require("../repo/FoodRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const weekNumber = req.body.weekNumber;
	try {
		var docs = await FoodRepo.getWeeklyFoods(weekNumber);
	} catch (error) {
		return sendErrorResponse(res, 500, "Could not get weekly foods");
	}
	res.send(docs);
};
