const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true, default: 11 },
		priceInCents: { type: Number, required: true, default: 11_000 },
		quantityInInventory: { type: Number, required: true, default: 0 },
		description: { type: String, default: "empty" },
		dateCreated: { type: Date, default: Date.now() }
	},
	{ collection: "GroceryCollection" }
);

const GroceryCollection = mongoose.model(
	"GroceryCollection",
	GrocerySchema
);

module.exports = GroceryCollection;
