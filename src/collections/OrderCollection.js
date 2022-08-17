const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			required: true,
			default: "preparing",
			enum: ["preparing", "delivering", "delivered"]
		},
		address: { type: String, required: true },
		instructions: {
			type: String
		},
		deliveryDate: { type: Date, required: true },
		deliveryMethod: {
			type: String,
			default: "door delivery",
			enum: ["door delivery", "pickup"]
		},
		dateOfCreation: {
			type: Date,
			default: new Date().toISOString().slice(0, 10)
		}
	},
	{ collection: "OrderCollection" }
);

const OrderCollection = mongoose.model(
	"OrderCollection",
	OrderSchema
);

module.exports = OrderCollection;
