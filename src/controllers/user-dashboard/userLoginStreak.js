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
        const user_details = await UserCollection.findOne({ email: user.email });
        const nowDate = new Date();
        if(user_details.lastLogin.getFullYear() == nowDate.getFullYear() && user_details.lastLogin.getMonth() == nowDate.getMonth() && user_details.lastLogin.getDate() == nowDate.getDate()-1) {
            user_details.loginStreak +=  1 ;
            if(user_details.bestStreak < user_details.loginStreak){
                user_details.bestStreak = user_details.loginStreak;
            }
            user_details.lastLogin.setDate(newDate.getDate());
            await user_details.save();
        }
        else{
            user_details.loginStreak = 1;
            user_details.lastLogin.setDate(newDate.getDate());
            await user_details.save();
        }
		res.json({success: true, message: "streak updated successfully",loginStreak: user_details.loginStreak, bestStreak: user_details.bestStreak});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
