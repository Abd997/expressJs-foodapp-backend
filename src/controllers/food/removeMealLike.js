const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { mealId } = req.body;
	if (!mealId) {
		throw new Error("Meal id not sent");
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
		const { mealId } = req.body;
		let doc = await FoodCollection.findById(mealId);
		if (doc.likes == 0) {
			return res.json({
				msg: "Meal updated"
			});
		}
		await FoodCollection.updateOne(
			{ _id: mealId },
			{
				likes: doc.likes - 1
			}
		);
		// doc = await FoodCollection.findById(mealId);
		// return res.send(doc);
		return res.json({
			msg: "Meal updated"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
