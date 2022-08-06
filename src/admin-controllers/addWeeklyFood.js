const e = require("express");
const FoodRepo = require("../repo/FoodRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const data = {
		name: req.body.name,
		description: req.body.description,
		foodType: req.body.foodType,
		price: req.body.price,
		weekNumber: req.body.weekNumber,
		currency: req.body.currency,
		tags: req.body.tags
	};
	try {
		var doc = await FoodRepo.addFood(data);
	} catch (error) {
		return sendErrorResponse(res, 500, "Could not add food item");
	}
	res.json({ msg: "Food item added successfully" });
};
