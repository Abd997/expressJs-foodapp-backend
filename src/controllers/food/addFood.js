const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadToAzure = require("../../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			description: req.body.description,
			foodType: req.body.foodType,
			price: req.body.price,
			weekNumber: req.body.weekNumber,
			currency: req.body.currency,
			tags: req.body.tags
		};
		const doc = await FoodCollection.create(data);
		if (!doc) {
			throw new Error("Data not added");
		}
		res.json({ msg: "Data added successfully" });
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
