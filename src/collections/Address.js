const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    created_on: { type: Date, default: Date.now() },
    updated_on: { type: Date, default: Date.now() },
  },
  { collection: "AddressCollection" }
);

const AddressCollection = mongoose.model("AddressCollection", AddressSchema);

module.exports = AddressCollection;
