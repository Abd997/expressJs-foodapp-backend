const e = require("express");
const CustomMealsCollection = require("../../../collections/CustomMealsCollection");
const BadRequestError = require("../../../custom-error/BadRequestError");
const sendErrorResponse = require("../../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {

};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const custom = await CustomMealsCollection.create({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			nutritions: req.body.nutritions,
			options: req.body.options
		});
		
		return res.json({
			msg: "Custom has been added",
			data: custom, 
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
