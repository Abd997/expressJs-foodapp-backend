const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        profileImageUrl: { type: String , default:"empty"},
        storyUrl: { type: String, required: true},
        caption: { type: String },
        date: { type: Date, default: Date.now() },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 86400
        }
    },
    {
        timestamps: true,
        collection: "StoryCollection"
    }
)

const StoryCollection = mongoose.model("StoryCollection", StorySchema);

module.exports = StoryCollection;
