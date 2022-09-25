const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, default: "empty" },
    lastName: { type: String, required: true, default: "empty" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, default: "empty" },
    dateOfBirth: { type: String, default: "empty" },
    socketId: { type: String },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "StoryCollection" }],
    channels: [
      {
        title: { type: String },
        videoUrl: { type: String },
        channelType: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { collection: "AdminCollection" }
);

const AdminCollection = mongoose.model("AdminCollection", AdminSchema);

module.exports = AdminCollection;
