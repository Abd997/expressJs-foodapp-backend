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
        const { takenWater  } = req.body;
        if(takenWater<0 && takenWater>7){
            return res.json({success: true, message: "takenWater is invalid it's between 0 and 7"})
        }
        const user_details = await UserCollection.findOne({ email: user.email });
        const nowDate = new Date();
        let dateFound = false;
        for(let water of user_details.water){
            if (water.date.getFullYear() == nowDate.getFullYear() && water.date.getMonth() == nowDate.getMonth()  && water.date.getDate() == nowDate.getDate() ) {
                dateFound = true;
                water.taken = parseInt(takenWater);
            }
        }
        if (dateFound) {
            await user_details.save();
        }
        else{
            user_details.water.push({date: new Date(), taken: parseInt(takenWater)})
            await user_details.save();
        }
        await user_details.save();
		res.json({success: true, message: "height updated successfully",water: user_details.water});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
