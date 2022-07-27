const e = require("express");
const FoodCollection = require("../models/Food");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const weekNumber = req.params.weekNumber;
	const docs = await FoodCollection.find(
		{ weekNumber: weekNumber },
		"name price foodType tags imageURL currency"
	);
	res.send(docs);
};
