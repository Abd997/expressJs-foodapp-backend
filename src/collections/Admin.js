const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: String,
    dateOfBirth: String,
  },
  { collection: "AdminCollection" }
);

const AdminCollection = mongoose.model("AdminCollection", UserSchema);

module.exports = AdminCollection;
