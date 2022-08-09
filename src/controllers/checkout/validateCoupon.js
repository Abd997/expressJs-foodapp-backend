const e = require("express");
const CouponCollection = require("../../collections/Coupons");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { couponNumber } = req.params;
	if (!couponNumber) {
		throw new Error("Coupon number not sent");
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
		const { couponNumber } = req.params;

		const coupon = await CouponCollection.findOne({
			number: couponNumber
		});
		if (!coupon) {
			throw new Error("Coupon is not valid");
		}
		return res.json({
			msg: "Coupon is valid"
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
