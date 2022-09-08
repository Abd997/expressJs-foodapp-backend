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
        let { age, gender, height, weight, exerciseType } = req.body;
        const user_details = await UserCollection.findOne({ email: user.email });
        console.log(user_details.age, user_details.gender, user_details.height, user_details.weight)
        let bmi = 0;
        if ((weight.unit == "kg") && (height.unit == "meter" || height.unit == "meters")) {
            bmi = weight.value / (height.value * height.value)
        }
        if ((weight.unit == "lb" || weight.unit == "lbs" || weight.unit == "pound" || weight.unit == "pounds") && (height.unit == "in" || height.unit == "inches")) {
            bmi = 703 * weight.value / (height.value * height.value)
        }
        if ((weight.unit == "lb" || weight.unit == "lbs" || weight.unit == "pound" || weight.unit == "ft") && (height.unit == "feet" || height.unit == "feets")) {
            height.value = parseInt(height.value.toString().split(".")[0] * 12) + parseInt(height.value.toString().split(".")[1]);
            height.unit = "inches";
            bmi = 703 * weight.value / (height.value * height.value)
        }
        user_details.bmi = bmi;
        await user_details.save();
        let bmr = 0;
        if (gender == "male" || gender == "man" || gender == "men") {
            if ((weight.unit == "lb" || weight.unit == "lbs" || weight.unit == "pound") && (height.unit == "in" || height.unit == "inches")) {
                bmr = 66.47 + (6.24 * weight.value) + (12.7 * height.value) - (6.75 * age)
            }
            if ((weight.unit == "kg" || weight.unit == "kilogram") && (height.unit == "meter" || height.unit == "meters")) {
                height.value = height.value * 100;
                height.unit = "cm";
                bmr = 66.5 + (13.75 * weight.value) + (5.003 * height.value) - (6.75 * age)
            }
            if ((weight.unit == "kg" || weight.unit == "kilogram") && (height.unit == "ft" || height.unit == "feet")) {
                bmr = 66.5 + (13.75 * weight.value) + (5.003 * (height.value * 30.48)) - (6.75 * age)
            }
        }
        if (gender == "female" || gender == "woman" || gender == "women") {
            if ((weight.unit == "lb" || weight.unit == "lbs" || weight.unit == "pound") && (height.unit == "in" || height.unit == "inches")) {
                bmr = 65.51 + (4.35 * weight.value) + (4.7 * height.value) - (4.7 * age)
            }
            if ((weight.unit == "kg" || weight.unit == "kilogram") && (height.unit == "meter" || height.unit == "meters")) {
                height.value = height.value * 100;
                height.unit = "cm";
                bmr = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age)
            }
            if ((weight.unit == "kg" || weight.unit == "kilogram") && (height.unit == "ft" || height.unit == "feet")) {

                bmr = 655.1 + (9.563 * weight.value) + (1.850 * (height.value * 30.48)) - (4.676 * age)
            }
        }
        let required_calories = 0;
        if (exerciseType == "little") {
            required_calories = bmr * 1.2;
        }
        if (exerciseType == "light") {
            required_calories = bmr * 1.375;
        }
        if (exerciseType == "moderate") {
            required_calories = bmr * 1.55;
        }
        if (exerciseType == "hard") {
            required_calories = 1.725
        }

        let required_carbohydrates = required_calories / 2;
        required_carbohydrates = required_carbohydrates / 4;

        let required_fat = required_calories * 0.3;
        required_fat = required_fat / 9;

        let required_protein = 0;
        if (weight.unit == "kg") {
            weight.value = weight.value * 2.20462;
            weight.unit = "pound";
        }
        required_protein = (weight.value / 20);
        required_protein = (required_protein * 7);


        let nutritions = [
            {
                "name": "calories",
                "required": required_calories,
                "taken": 0,
                "unit": "g",
            }, {
                "name": "carbohydrate",
                "required": required_carbohydrates,
                "taken": 0,
                "unit": "g",
            }, {
                "name": "fat",
                "required": required_fat,
                "taken": 0,
                "unit": "g",
            }, {
                "name": "protein",
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

        res.json({ success: true, data: [user_details.nutritions, user_details.bmi] })


    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};
