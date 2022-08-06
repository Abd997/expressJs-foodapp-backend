const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
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
