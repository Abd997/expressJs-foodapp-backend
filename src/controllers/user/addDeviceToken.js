const e = require("express");
const UserCollection = require("../../collections/User");
const sendErrorResponse = require("../../utils/sendErrorResponse");
require("dotenv").config();

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, deviceToken } = req.body;
    if (!deviceToken || typeof deviceToken !== "string") {
        return res.status(404).send({ message:"deviceToken is required" });
    }
	try {
		const user = await UserCollection.findOne({email: email});
		if (!user) {
			return res.status(400).json({ msg: "User not exists" });
		}
        else{
            user.deviceToken = deviceToken;
            await user.save();
            return res.status(200).json({ msg: "User deviceToken updated", deviceToken: user.deviceToken });
        }
	} catch (err) {
		return sendErrorResponse(
			res,
			500,
			err.message
		);
	}

	
	
};
