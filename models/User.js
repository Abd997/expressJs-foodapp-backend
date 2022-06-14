const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // required
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    // not required
    gender: String,
    weight: String,
    weightGoal: String,
    currentActivityLevel: String,
    dateOfBirth: String,
    Height: String,
  },
  { collection: "UserCollection" }
);

const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection;
