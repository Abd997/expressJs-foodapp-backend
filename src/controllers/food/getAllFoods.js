const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const sendErrorResponse = require("../../utils/sendErrorResponse");


/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try { 
		const userFavouriteFoodIds = req.body.user.favouriteFoodIds;
		const foods = await FoodCollection.find({});

		let favouriteFood = [];
		for(let food of foods){
			let newFood = {};
			if(userFavouriteFoodIds.includes(food._id)){
				favouriteFood.push({food,isFavourite:true})
			}
			else{ 
				favouriteFood.push({food,isFavourite:false})
			}
			
		}
		res.send({
			data: favouriteFood
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
