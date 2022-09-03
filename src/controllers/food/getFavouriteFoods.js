const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const UserCollection = require("../../collections/User");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { loggedInUser } = req.body;
		/** @type {Array} */
		const favFoodsId = loggedInUser.favouriteFoodIds;
		let favFoods = [];

		for (let index = 0; index < favFoodsId.length; index++) {
			let element = favFoodsId[index];
			let favFood = await FoodCollection.findById(element).populate({path: "ingredients", select:"name imageURL"});
			if (favFood) {
				favFoods.push(favFood);
			}
		}
		let favouriteFood = [];
		for (let food of favFoods) {
			if (favFoodsId.includes(food._id)) {
				favouriteFood.push({ food, isFavourite: true });
			} else {
				favouriteFood.push({ food, isFavourite: false });
			}
		}
		res.send(favouriteFood);
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
