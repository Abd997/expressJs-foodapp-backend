const e = require("express");
const FoodIngredients = require("../../collections/FoodIngredients");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadToAzure = require("../../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await uploadToAzure(req);
		const data = {
			name: req.body.name,
			imageURL: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`
		};
		const result = await FoodIngredients.create(data);
		return res.json({message:"Ingredient has been added",result});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
