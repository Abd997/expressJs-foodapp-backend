const e = require("express");
const GroceryCollection = require("../../collections/GroceryCollection");
const UserCollection = require("../../collections/User");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { groceryId, quantity } = req.body;
	if (!groceryId) {
		throw new Error("Grocery id not sent");
	} else if (!quantity) {
		throw new Error("Grocery quantity not sent");
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
		const { groceryId, quantity } = req.body;
		const groceryToAdd = await GroceryCollection.findById(groceryId);
		if (!groceryToAdd) {
			throw new Error("Grocery does not exist");
		}
		const user = await UserCollection.findOne({ email: email });
		/** @type {Array} */
		const groceries = user.groceries;
		let existingGrocery = groceries.map(
			(e) => e.groceryId === groceryId
		);
		if (!existingGrocery) {
			groceries.push({ groceryId, quantity });
		} else {
			const ind = groceries.findIndex(
				(e) => e.groceryId === groceryId
			);
			groceries[ind].quantity += quantity;
		}
		return res.json({
			msg: "Grocery has been added"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
