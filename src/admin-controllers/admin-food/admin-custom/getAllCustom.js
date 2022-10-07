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
		const customs = await CustomMealsCollection.find({})
		let allCustoms = []
		for(let custom of customs) {
			allCustoms.push({_id: custom.id,custom:custom.data});
		}
		return res.json({
			msg: "Customs has been fetched successfully",
			data: allCustoms, 
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
