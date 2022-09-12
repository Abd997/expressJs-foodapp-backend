require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");
const UserCollection = require("../../collections/User");
const BadRequestError = require("../../custom-error/BadRequestError");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const bcrypt = require("bcrypt");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		// check if user exists
		const { email, password } = req.body;
		const user = await UserCollection.findOne({
			email: email
		});
		if (!user) {
			throw new BadRequestError("User not registered");
		}

		const validPassword = await bcrypt.compare(
			password,
			user.password
		);
		if (!validPassword) {
			throw new BadRequestError("Authentication is not correct");
		}

		// update user last login
		// increment user login streak if valid
		const currentDate = new Date().toISOString().slice(0, 10);
		let userLastLogin = user.lastLogin;
		let loginStreak = user.loginStreak;
		if (currentDate > userLastLogin) {
			loginStreak++;
		}
		userLastLogin = new Date().toISOString().slice(0, 10);

		await UserCollection.updateOne(
			{
				email: email
			},
			{
				loginStreak: loginStreak,
				lastLogin: userLastLogin
			}
		);
 
		// create jwt token
		const token = await jwt.sign(email, process.env.JWT_KEY);

		/* This is just a way to get the user details and return it to the client. */
		const user_details = await UserCollection.findOne({
			email: email
		});
		
		const nowDate = new Date();
        if(user_details.lastLogin.getFullYear() == nowDate.getFullYear() && user_details.lastLogin.getMonth() == nowDate.getMonth() && user_details.lastLogin.getDate() == nowDate.getDate()-1) {
            user_details.loginStreak +=  1 ;
            if(user_details.bestStreak < user_details.loginStreak){
                user_details.bestStreak = user_details.loginStreak;
            }
            user_details.lastLogin = nowDate
            await user_details.save();
        }
        else{
            user_details.loginStreak = 1;
            user_details.lastLogin = nowDate
            await user_details.save();
        }
		
		/* Returning the response to the client. */
		return res.json({
			msg: "User successfully authenticated",
			data: {
				id: user_details._id,
				firstName: user_details.firstName,
				lastName: user_details.lastName,
				email: user_details.email,
				token: token,
				isAmbassador: user_details.isAmbassador,
				profileImageUrl: user_details.profileImageUrl,
				gender: user_details.gender,
				weight: user_details.weight,
				weightGoal: user_details.weightGoal,
				height: user_details.height,
				bmi: user_details.bmi,
				calories: user_details.calories,
				water: user_details.water,
				steps: user_details.steps,
				food: user_details.food,
				loginStreak: user_details.loginStreak,
				bestStreak: user_details.bestStreak,
				nutritions: user_details.nutritions, 
			}
		});

	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return sendErrorResponse(
				res,
				200,{statusCode: 500, message: "Could not create token for user"});
		} else if (error instanceof BadRequestError) {
			return sendErrorResponse(res, 200,{statusCode: 403, message: error.message});
		}
		return sendErrorResponse(res, 200,{statusCode: 500, message: error.message});
	}
};
