const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection1: "UserCollection" }
);

const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection;
