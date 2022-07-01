const e = require("express");
const { param } = require("express-validator");
const FoodCollection = require("../models/Food");
/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res, next) => {
	try {
		const doc = await FoodCollection.findOne({ _id: req.params.id });
		if (!doc) {
			return res.status(400).send({
				msg: "Id is invalid"
			});
		}
	} catch (err) {
		return res.status(400).send({
			msg: "Id is invalid",
			err: err
		});
	}
	next();
};
