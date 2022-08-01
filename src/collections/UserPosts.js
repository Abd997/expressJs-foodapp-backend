const mongoose = require("mongoose");

const UserPostSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    imageFileName: String,
    description: String,
    title: String,
  },
  { collection: "UserPosts" }
);

const UserPosts = mongoose.model("UserPosts", UserPostSchema);

module.exports = UserPosts;
