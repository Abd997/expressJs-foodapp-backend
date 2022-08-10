const e = require("express");
const GroceryCollection = require("../../collections/GroceryCollection");
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
		await validate(req);
		const groceries = await GroceryCollection.find({});
		return res.json({
			groceries: groceries
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
