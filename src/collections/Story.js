const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
    {
        storyUrl: { type: String, required: true},
        caption: { type: String },
        date: { type: Date, default: Date.now() },
        createdAt: {
            type: Date,
            default: Date.now,
            index: { expires: "1h"}
        }
    },
    {
        timestamps: true,
        collection: "StoryCollection"
    }
);

const StoryCollection = mongoose.model("StoryCollection", StorySchema);

module.exports = StoryCollection;
