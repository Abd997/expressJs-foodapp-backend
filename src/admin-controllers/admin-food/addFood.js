const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
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
		const foodTypes = ["meal","babyfood","shakes","snacks","drinks"]
		console.log(!foodTypes.includes(req.body.foodType))
		if(!foodTypes.includes(req.body.foodType)){
			return sendErrorResponse(res, 500, "Food Type is not valid.");
		}
		const food = await FoodCollection.create({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			foodType: req.body.foodType,
			weekNumber: req.body.weekNumber,
			tags: req.body.tags,
			nutritions: req.body.nutritions,
			itemQuantity: req.body.itemQuantity,
			ingredients: req.body.ingredients,
			custom: req.body.custom,
		});
		
		res.json({
			msg: "Food item has been added",
			food: await FoodCollection.findById({_id: food._id}).populate({path: "ingredients", select:"name imageURL"})
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
