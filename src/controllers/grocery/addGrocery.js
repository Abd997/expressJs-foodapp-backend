const e = require("express");
const mongoose = require("mongoose");
const GroceryCollection = require("../../collections/GroceryCollection");
const UserCollection = require("../../collections/User");
const sendErrorResponse = require("../../utils/sendErrorResponse");

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
		const { groceryId, quantity, email, user } = req.body;
		const groceryToAdd = await GroceryCollection.findById(groceryId);
		if (!groceryToAdd) {
			throw new Error("Grocery does not exist");
		}
		/** @type {Array} */
		let groceries = user.groceries;
		let existingGrocery;
		for (let i = 0; i < groceries.length; i++) {
			if (groceries[i].groceryId.equals(groceryId)) {
				existingGrocery = groceries[i];
				break;
			}
		}
		// console.log(existingGrocery);
		// console.log(groceries);
		if (!existingGrocery) {
			groceries.push({ groceryId: groceryId, quantity: quantity });
		} else {
			const ind = groceries.findIndex((e) =>
				e.groceryId.equals(groceryId)
			);
			groceries[ind].quantity = groceries[ind].quantity + quantity;
		}
		await UserCollection.updateOne(
			{ email: email },
			{
				groceries: groceries
			}
		);
		return res.json({
			msg: "Grocery has been added"
		});
	} catch (error) {
		console.log(error);
		sendErrorResponse(res, 500, error.message);
	}
};
