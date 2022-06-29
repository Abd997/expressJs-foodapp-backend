const e = require("express");
const FoodCollection = require("../models/Food");

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
	const doc = await FoodCollection.create(data);
	if (!doc) {
		res.status(400).send("Data not added");
	}
	res.send("Data added successfully");
};
