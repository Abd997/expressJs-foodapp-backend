const e = require("express");
const FoodCollection = require("../collections/FoodCollection");
const { BadRequestError } = require("../custom-error");
const FoodRepo = require("../repo/FoodRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");
const uploadToAzure = require("../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */

const getColor = () =>{
	const colors = ["red","orange","green","purple","black","yellow"]
	const random = Math.floor(Math.random()*(5-0)) + 0
	return colors[random];
}

module.exports = async (req, res) => {
	try {
		let facts = [
			{
				fact: "calories",
				value: req.body.calories
			},
			{
				fact: "carbs",
				value: req.body.carbs
			},
			{
				fact: "fats",
				value: req.body.fats
			},
			{
				fact: "proteins",
				value: req.body.proteins
			}
		];

		/** @type {string} */
		let tags = req.body.tags;
		tags = tags.split(",");
		tags = tags.map(element => {
			return {
				text: element,
				color: getColor()
			}
		});
		await uploadToAzure(req);

		const ingredients = req.body.ingredients.split(",");

		const data = {
			name: req.body.name,
			description: req.body.description,
			foodType: req.body.foodType,
			price: req.body.price,
			weekNumber: req.body.weekNumber,
			tags: tags,
			itemQuantity: req.body.itemQuantity,
			facts: facts,
			weekNumber: req.body.weekNumber,
			imageURL: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`,
			ingredients: ingredients,
		};

		const foodTypes = ["meal","babyfood","shakes","snacks","drinks"]
		if(!foodTypes.includes(data.foodType)){
			return sendErrorResponse(res, 500, "Food Type is not valid.");
		}
		const result = await FoodCollection.create(data);
		res.send({message:"Food has been added", data: await FoodCollection.findById({_id: result._id}).populate({path: "ingredients", select:"name imageURL"}) });
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
