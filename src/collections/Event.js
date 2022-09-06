const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, default: "empty" },
		description: { type: String, required: true, default: "empty" },
		eventType: {type: String, enum:["featured", "upcoming"]},
		eventDate: { type: Date, required: true},
		image: { type: String, required: true },
		fee: { type: Number, default: 0 },
		location: { lat: String, lng: String }, 
		willingUsers:[{ type: mongoose.Schema.Types.ObjectId, ref:"UserCollection"}],
        participants:[{ type: mongoose.Schema.Types.ObjectId, ref:"UserCollection" }],
	},
	{ collection: "EventCollection" }
);

const EventCollection = mongoose.model(
	"EventCollection",
	EventSchema
);

module.exports = EventCollection;
