const e = require("express");
const FoodRepo = require("../repo/FoodRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

const validate = (req) => {
	const { foodId } = req.params;
	if (!foodId) {
		throw new Error("FoodId is needed");
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
		const { foodId } = req.params;
		const doc = await FoodRepo.findFood(foodId);
		// console.log(doc);
		res.send({
			data: doc
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
