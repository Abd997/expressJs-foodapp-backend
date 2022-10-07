const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { user } = req.body;
        const { meal,foodName, nutritions} = req.body;
        const user_details = await UserCollection.findOne({ email: user.email });
        const nowDate = new Date();
        let foodFound = false
        for(let food of user_details.food){
            if (food.date.getFullYear() == nowDate.getFullYear() && food.date.getMonth() == nowDate.getMonth()  && food.date.getDate() == nowDate.getDate() ) {
                foodFound = true;
                food[meal].push({name: foodName, nutritions: nutritions})
            }
        }
        if(foodFound){
           await user_details.save();
        }else{
            if(meal.trim() == "breakfast"){
                user_details.food.push({date: new Date(), breakfast:[{name: foodName, nutritions: nutritions}]})
            }
            if(meal.trim() == "lunch"){
                user_details.food.push({date: new Date(), lunch:[{name: foodName, nutritions: nutritions}]})
            }
            if(meal.trim() == "dinner"){
                user_details.food.push({date: new Date(), dinner:[{name: foodName, nutritions: nutritions}]})
            }
            if(meal.trim() == "snacks"){
                user_details.food.push({date: new Date(), snacks:[{name: foodName, nutritions: nutritions}]})
            }
            await user_details.save();
            
        }

        for(let x of nutritions){
            for(let y of user_details.nutritions){
                if(x.name.toLowerCase() == y.name.toLowerCase()){
                    y.taken += x.value;
                }
            }
        }
        await user_details.save();
		res.json({success: true, data: {food: user_details.food,nutritions: user_details.nutritions}})
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
