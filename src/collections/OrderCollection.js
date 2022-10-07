const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{

		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "UserCollection",
		},
		orderDetails: [
			{
				_id:false,
				orderItem: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "FoodCollection"
				},
				customs: [],
				quantity: {
					type: Number,
					required: true,
					default: 0
				},
			}
		],
		totalCost: {
			type: Number,
			required: true,
			default: 0
		},
		deliveryCharges: {
			type: Number,
			required: true,
		},
		couponCode: {
			type: String,
			default: ""
		},
		status: {
			type: String,
			required: true,
			default: "preparing",
			enum: ["preparing", "delivering", "delivered"]
		},
		paymentStatus:{
			type: String,
			default: "pending",
			enum: ["pending", "completed", "failed"]
		},
		deliveryAddress: { type: String, required: true },
		deliveryMethod: {
			type: String,
			default: "doorDelivery",
			enum: ["doorDelivery", "pickUp"]
		},
		deliveryDate: { type: Date, required: true },
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
