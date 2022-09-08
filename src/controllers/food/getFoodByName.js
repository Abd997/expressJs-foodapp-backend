const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { name } = req.params;
	// const valid = ["deals", "blogs", "recipes"].find((e) => e === type);
	if (!name) {
		throw new BadRequestError("Explore post type is not valid");
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
		const { name } = req.params;
		
		const data = await FoodCollection.find({ name: { $regex: name, $options: "i" }}).select("name imageURL nutritions")
		
		res.json({
			data: data
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
