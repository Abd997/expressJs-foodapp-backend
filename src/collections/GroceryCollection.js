const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema(
	{

		name: String,
		marked: Boolean,
		unit: String,
		quantity: Number,
		dateCreated: { type: Date, default: Date.now() }
	},
	{ collection: "GroceryCollection" }
);

const GroceryCollection = mongoose.model(
	"GroceryCollection",
	GrocerySchema
);

module.exports = GroceryCollection;
