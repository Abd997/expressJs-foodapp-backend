const e = require("express");
const UserRepo = require("../repo/UserRepo");
const sendErrorResponse = require("../utils/sendErrorResponse");

const validate = async (req) => {
	const { email } = req.params;
	if (!email) {
		throw new Error("Email not sent");
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
		const { email } = req.params;
		const doc = await UserRepo.getFavFoods(email);
		res.send({ data: doc });
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
