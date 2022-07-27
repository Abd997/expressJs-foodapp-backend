const e = require("express");
const FoodCollection = require("../models/Food");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const doc = await FoodCollection.findOne({ _id: req.params.id });
	if (!doc) {
		return res.status(400).send("Data not found");
	}
	res.send(doc);
};
