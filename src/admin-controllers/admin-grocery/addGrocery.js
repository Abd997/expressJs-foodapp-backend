const e = require("express");
const GroceryCollection = require("../../collections/GroceryCollection");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const {  name, price, priceInCents, quantityInInventory, description, ingredients } = req.body;
	if (!name || typeof name !== "string") {
		throw new BadRequestError("Grocery name is not valid");
	} else if (!price || typeof price !== "number") {
		throw new BadRequestError("Grocery price is not valid");
	} else if (
		!quantityInInventory ||
		typeof quantityInInventory !== "number"
	) {
		throw new BadRequestError("Quantity in inventory is not valid");
	}
	else if(!description || typeof description !== "string"){
		throw new BadRequestError("Description is not valid");
	}
	else if(!ingredients){
		throw new BadRequestError("Ingredients is not valid");
	}
	else if(!priceInCents){
		throw new BadRequestError("priceInCents is not valid");
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
		const { adminUser, name, price, priceInCents, quantityInInventory, description, ingredients } =
			req.body;
		const data = await GroceryCollection.create({
			name: name,
			price: price,
			priceInCents: priceInCents * 100,
			quantityInInventory: quantityInInventory,
			description: description,
			ingredients: ingredients
		});
		res.json({
			msg: "Groceries have been added",
			data: data
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
