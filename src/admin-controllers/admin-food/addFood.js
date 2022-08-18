const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");

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
		const food = await FoodCollection.create({
			name: req.body.name,
			price: req.body.price,
			mealType: req.body.mealType,
			weekNumber: req.body.weekNumber,
			tags: req.body.tags,
			facts: req.body.facts,
			itemQuantity: req.body.itemQuantity
		});
		res.json({
			msg: "Food item has been added",
			food: food
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
