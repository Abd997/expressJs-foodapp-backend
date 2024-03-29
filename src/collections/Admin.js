const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, default: "empty" },
    lastName: { type: String, required: true, default: "empty" },
    profileImageUrl: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, default: "empty" },
    dateOfBirth: { type: String, default: "empty" },
    socketId: { type: String },
    
  },
  { collection: "AdminCollection" }
);

const AdminCollection = mongoose.model("AdminCollection", AdminSchema);

module.exports = AdminCollection;
