const e = require("express");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		const doc = await UserRepo.getFavFoods(email);
		res.send({ data: doc });
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
