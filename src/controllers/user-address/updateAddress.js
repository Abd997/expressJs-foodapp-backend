const e = require("express");
const AddressCollection = require("../../collections/Address");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { title, address, addressId } = req.body;
	if (!title) {
		throw new Error("Title not sent");
	} else if (!address) {
		throw new Error("Address not sent");
	} else if (!addressId) {
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
		const { title, address, addressId } = req.body;
		await AddressCollection.findByIdAndUpdate(addressId, {
			title: title,
			address: address
		});
		return res.json({
			msg: "Address successfully edited"
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
