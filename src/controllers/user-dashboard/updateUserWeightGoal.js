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
        const { weightGoal,  } = req.body;
        const user_details = await UserCollection.findOne({ email: user.email });
        user_details.weightGoal = weightGoal;
        await user_details.save();
        
		let {age,weight,height,currentActivityLevel,gender} = user_details;
		
        let bmi = 0;
        if ((weight.unit == "kg") && (height.unit == "meter")) {
            bmi = weight.value / (height.value * height.value)
        }
        if ((weight.unit == "kg") && (height.unit == "ft")) {
            bmi = weight.value / ((height.value * 0.3048) * (height.value * 0.3048))
        }
        if ((weight.unit == "lb") && (height.unit == "in")) {
            bmi = 703 * weight.value / (height.value * height.value)
        }
        if ((weight.unit == "lb") && (height.unit == "ft")) {
            let heightValue = parseInt(height.value.toString().split(".")[0] * 12) + parseInt(height.value.toString().split(".")[1]);
            bmi = 703 * weight.value / (heightValue * heightValue)
        }
        user_details.bmi = bmi;
        await user_details.save();
        let bmr = 0;
        let newWeight = 0;
        let newHeight = 0;

        if (weight.unit == "kg") {
            newWeight = weight.value;
        } else {
            newWeight = weight.value * 0.453
        }

        if (height.unit == "cm") {
            newHeight = height.value;
        } else {
            newHeight = height.value * 30.48;
        }
        if (gender == "male") {
            bmr = 66.5 + (13.75 * newWeight) + (5.003 * newHeight) - (6.75 * age)
        }
        else if (gender == "female") {
            bmr = 655.1 + (9.563 * newWeight) + (1.850 * newHeight) - (4.676 * age)

        }
        let required_calories = 0;
        if (currentActivityLevel == "low") {
            required_calories = bmr * 1.2;
        }
        if (currentActivityLevel == "light") {
            required_calories = bmr * 1.375;
        }
        if (currentActivityLevel == "moderate") {
            required_calories = bmr * 1.55;
        }
        if (currentActivityLevel == "hard") {
            required_calories = bmr * 1.725
        }

        if(weightGoal == "weightLoss"){
            required_calories -=500;
        }else if(weightGoal == "weightGain"){
            required_calories +=500;
        }
        
        let required_carbohydrates = required_calories / 2;
        required_carbohydrates = required_carbohydrates / 4;

        let required_fat = required_calories * 0.3;
        required_fat = required_fat / 9;

        let required_protein = 0;

        if (weight.unit == "kg") {
            required_protein = (((weight.value * 2.20462) * 2.20462) / 20);
            required_protein = (required_protein * 7);
        }
        required_protein = ((weight.value * 2.20462) / 20);
        required_protein = (required_protein * 7);


        let nutritions = [
            {
                "name": "calories",
                "required": required_calories,
                "taken": 0,
                "unit": "g",
            }, {
                "name": "carbs",
                "required": required_carbohydrates,
                "taken": 0,
                "unit": "g",
            }, {
                "name": "fat",
                "required": required_fat,
                "taken": 0,
                "unit": "g",
            }, {
                "name": "protien",
                "required": required_protein,
                "taken": 0,
                "unit": "g",
            },
        ]
        for (let x of user_details.nutritions) {
            for (let y of nutritions) {
                if (x.name == y.name) {
                    x.taken = y.taken;
                }
            }
        }
        user_details.nutritions = nutritions;
		await user_details.save();
		return res.json({success: true, message: "weightGoal updated successfully",data: user_details});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};