const e = require("express");
const FoodCollection = require("../collections/FoodCollection");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const weekNumber = req.params.weekNumber;
	const docs = await FoodCollection.find(
		{ weekNumber: weekNumber },
		"id name price foodType tags imageURL currency"
	).where('foodType').equals(req.params.foodType)
	res.send(docs);
};
