const e = require("express");
const AddressCollection = require("../entities/Address");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
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
		const doc = await AddressCollection.find({ email: email });
		return res.json({
			msg: "Data retrieved successfully",
			data: doc
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
