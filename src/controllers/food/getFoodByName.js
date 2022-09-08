const e = require("express");
const axios = require('axios');
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
		const data = JSON.stringify({
			"query": name
		});

		var config = {
			method: 'post',
			url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
			headers: {
				'x-app-id': 'aebbf73e',
				'x-app-key': '0b7f87de4edbac779c0db3ac3eea7b5d',
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				console.log(response.data.foods);
				let food = [];
				for (let data of response.data["foods"]) {
					food.push({ name: data.food_name, image: data.photo, calories: data.nf_calories, fat: data.nf_total_fat, carbs: data.nf_total_carbohydrate, protien: data.nf_protein })
				}
				return res.json({
					data: food
				});
			})


	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
