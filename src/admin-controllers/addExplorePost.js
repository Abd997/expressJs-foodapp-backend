const e = require("express");
const ExplorePostCollection = require("../collections/ExplorePost");
const { BadRequestError } = require("../custom-error");
const sendErrorResponse = require("../utils/sendErrorResponse");
const uploadToAzure = require("../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	// const { title, postType, description } = req.body;
	// if (!title || typeof title !== "string") {
	// 	throw new Error("Title not valid");
	// }
	// if (!postType || typeof postType !== "string") {
	// 	throw new Error("PostType not valid");
	// }
	// if (!description || typeof description !== "string") {
	// 	throw new Error("Description not valid");
	// }
};
/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		/** @type{string} */
		let { title, tags, description, nutritions, recipeSteps, ingredients, postType,article } = req.body;
		tags = tags.split(',');
		if (postType == "recipe") {
			nutritions = nutritions.split(',').map(item => {
				return { name: item.split('-')[0], value: item.split("-")[1] };
			});
			recipeSteps = recipeSteps.split('|');

			ingredients = ingredients.split(',').map(item => {
				return { name: item.split('-')[0], quantity: item.split("-")[1] };
			});
		}

		const imageUrl =
			"https://foodappstorageaccount.blob.core.windows.net/container/" +
			req.file.filename
		await uploadToAzure(req);
		const data = await ExplorePostCollection.create({ title, postType, imageUrl, tags, description, recipeSteps, ingredients, nutritions,article });
		res.json({
			msg: "Explore Post added",
			data: data
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
