const e = require("express");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");

const validate = async (req) => {
	const { email, foodId } = req.body;
	if (!email && !foodId) {
		throw new Error("Email and FoodId not sent");
	}
	if (!email) {
		throw new Error("Email not sent");
	}
	if (!foodId) {
		throw new Error("FoodId not sent");
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
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
	const { email, foodId } = req.body;
	try {
		await UserRepo.addFavourite(email, foodId);
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
	res.send({ msg: "Favourite food updated" });
};
