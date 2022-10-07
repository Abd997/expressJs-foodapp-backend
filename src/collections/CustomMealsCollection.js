const mongoose = require("mongoose");

const CustomMealsSchema = new mongoose.Schema(
  {
    data: [
      {
        title: String,
        options: [
          {
            name: String,
            price: Number,
            protein: Number,
            fat: Number,
            carbs: Number,
            calories: Number,
          },
        ],
      },
    ]
  },
  { collection: "CustomMealsCollection" }
);

const CustomMealsCollection = mongoose.model(
  "CustomMealsCollection",
  CustomMealsSchema
);

module.exports = CustomMealsCollection;
