const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        profileImageUrl: { type: String},
        title: { type: String },
        coverUrl: { type: String },
        videoUrl: { type: String },
        channelType: { type: String },
        date: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
        collection: "ChannelCollection"
    }
);

const ChannelCollection = mongoose.model("ChannelCollection", ChannelSchema);

module.exports = ChannelCollection;
