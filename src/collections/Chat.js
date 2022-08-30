const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref:"UserCollection", unique: true},
        adminId: { type: mongoose.Schema.Types.ObjectId, ref:"AdminCollection" },
        messages:[
            {
                _id: false,
                text: { type: String},
                sentBy: {type:String, enum:["user", "admin"]},
                time: { type: Date, default: Date.now() },
            }
        ]
	},
	{ collection: "ChatCollection" }
);

const ChatCollection = mongoose.model(
	"ChatCollection",
	ChatSchema
);

module.exports = ChatCollection;
