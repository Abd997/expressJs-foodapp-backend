const mongoose = require("mongoose");

const CustomMealsSchema = new mongoose.Schema(
  {
    name: { type: String },
    options: [
      {
        _id: false,
        name: String,
        price: { type: Number, default: 0 },
        marked: { type: Boolean, default: false },
        protein: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        carbs: { type: Number, default: 0 },
        calories: { type: Number, default: 0 },
      }
    ],
    dateCreated: { type: Date, default: new Date() },
  },
  { collection: "CustomMealsCollection" }
);

const CustomMealsCollection = mongoose.model(
  "CustomMealsCollection",
  CustomMealsSchema
);

module.exports = CustomMealsCollection;
