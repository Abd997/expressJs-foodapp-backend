const mongoose = require("mongoose");

const CustomMealsSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number, default: 0 },
    nutritions: [
      {
        _id: false,
        fact: String,
        value: Number,
        unit: { type: String, default: "g" },
      },
    ],
    options: [
      {
        _id: false,
        name: String,
        price: { type: Number, default: 0 },
        marked: { type: Boolean, default: false },
        protein: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        carbs: { type: Number, default: 0 },
        veggies: { type: Number, default: 0 },
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
