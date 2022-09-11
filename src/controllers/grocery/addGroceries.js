const e = require("express");
const GroceryCollection = require("../../collections/GroceryCollection");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

const validate = async (req) => {
	const { ingredients } = req.body;
	for (let ingredient of ingredients) {
		if (!ingredient.name || typeof ingredient.name !== "string") {
			throw new BadRequestError("Grocery name is not valid");
		} else if ( typeof !ingredient.marked !== "boolean") {
			throw new BadRequestError("Grocery marked is not valid");
		}else if (!ingredient.unit || typeof ingredient.unit !== "string") {
			throw new BadRequestError("Grocery unit is not valid");
		}else if (
			!ingredient.quantity || typeof ingredient.quantity !== "number"
		) {
			throw new BadRequestError("Quantity in inventory is not valid");
		}
		else if (typeof ingredient.visible !== "boolean") {
			throw new BadRequestError("Grocery visible is not valid");
		}
	}
	
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		const { user, ingredients } =
			req.body;

		const groceries = []
		const user_details = await UserCollection.findOne({ email: user.email });
		for (let grocery of ingredients) {
			const data = await GroceryCollection.create({
				name: grocery.name,
				marked: grocery.marked,
				unit: grocery.unit,
				quantity: grocery.quantity,
				visible: grocery.visible
			});
			user_details.groceries.push(data._id)
			groceries.push(data)
		}
		await user_details.save();
		res.json({
			msg: "Groceries have been added",
			data: groceries
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
