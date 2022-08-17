const e = require("express");
const GroceryCollection = require("../../collections/GroceryCollection");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { groceryName, groceryPrice, groceryQuantity } = req.body;
	if (!groceryName || typeof groceryName !== "string") {
		throw new BadRequestError("Grocery name is not valid");
	} else if (!groceryPrice || typeof groceryPrice !== "number") {
		throw new BadRequestError("Grocery price is not valid");
	} else if (
		!groceryQuantity ||
		typeof groceryQuantity !== "number"
	) {
		throw new BadRequestError("Grocery quantity is not valid");
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
		const { adminUser, groceryName, groceryPrice, groceryQuantity } =
			req.body;
		await GroceryCollection.create({
			name: groceryName,
			price: groceryPrice,
			priceInCents: groceryPrice * 100,
			quantityInInventory: groceryQuantity
		});
		res.json({
			msg: "Groceries have been added"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
