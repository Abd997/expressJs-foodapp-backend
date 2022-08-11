const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
	{
		number: { type: Number, require: true, unique: true }
	},
	{ collection: "CouponCollection" }
);

const CouponCollection = mongoose.model(
	"CouponCollection",
	CouponSchema
);

module.exports = CouponCollection;
