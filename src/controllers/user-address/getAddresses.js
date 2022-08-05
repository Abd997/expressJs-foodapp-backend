const e = require("express");
const AddressCollection = require("../../collections/Address");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		const doc = await AddressCollection.find({ email: email });
		return res.json({
			msg: "Data retrieved successfully",
			data: doc
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
