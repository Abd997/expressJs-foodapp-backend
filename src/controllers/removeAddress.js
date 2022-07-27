const e = require("express");
const AddressCollection = require("../entities/Address");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { addressId } = req.body;
	if (!addressId) {
		throw new Error("AddressId not sent");
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
		const { addressId } = req.body;
		await AddressCollection.findByIdAndRemove(addressId);
		return res.json({
			msg: "Address deleted"
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
